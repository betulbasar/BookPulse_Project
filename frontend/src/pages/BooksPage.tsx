import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { booksService } from '../services/booksService'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import BookForm from '../components/books/BookForm'
import { Plus, Search } from 'lucide-react'
import type { Book, CreateBookDto } from '../types/book'

export default function BooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  const { data: books, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: booksService.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: booksService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  const filteredBooks = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-800 dark:text-pink-200">Books</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 inline mr-2" />
          Add New Book
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading...</div>
      ) : filteredBooks && filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{book.title}</h3>
                {book.averageRating && (
                  <span className="text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
                    ⭐ {book.averageRating.toFixed(1)}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{book.author}</p>
              {book.isbn && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">ISBN: {book.isbn}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {book.availableCopies}/{book.totalCopies} available
                </span>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(book.id)}
                  className="text-sm"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {searchTerm ? 'No results found' : 'No books added yet'}
          </p>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Book"
      >
        <BookForm
          onSubmit={async (data: CreateBookDto) => {
            await booksService.create(data)
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setIsModalOpen(false)
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
