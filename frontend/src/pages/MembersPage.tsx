import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { membersService } from '../services/membersService'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import MemberForm from '../components/members/MemberForm'
import { Plus, Search } from 'lucide-react'
import type { CreateMemberDto } from '../types/member'

export default function MembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  const { data: members, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: membersService.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: membersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  const filteredMembers = members?.filter(
    (member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 inline mr-2" />
          Add New Member
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredMembers && filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">
                  {member.firstName} {member.lastName}
                </h3>
                {member.isActive ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-1">{member.email}</p>
              {member.phoneNumber && (
                <p className="text-sm text-gray-500 mb-4">
                  {member.phoneNumber}
                </p>
              )}
              <p className="text-xs text-gray-400 mb-4">
                Registered: {new Date(member.registrationDate).toLocaleDateString('en-US')}
              </p>
              <Button
                variant="danger"
                onClick={() => handleDelete(member.id)}
                className="w-full text-sm"
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-center text-gray-500 py-8">
            {searchTerm ? 'No results found' : 'No members added yet'}
          </p>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Member"
      >
        <MemberForm
          onSubmit={async (data: CreateMemberDto) => {
            await membersService.create(data)
            queryClient.invalidateQueries({ queryKey: ['members'] })
            setIsModalOpen(false)
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
