using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookPulse.Data;
using BookPulse.DTOs;
using BookPulse.Models;

namespace BookPulse.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly BookPulseDbContext _context;

        public MembersController(BookPulseDbContext context)
        {
            _context = context;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
        {
            var members = await _context.Members
                .Select(m => new MemberDto
                {
                    Id = m.Id,
                    FirstName = m.FirstName,
                    LastName = m.LastName,
                    Email = m.Email,
                    PhoneNumber = m.PhoneNumber,
                    RegistrationDate = m.RegistrationDate,
                    IsActive = m.IsActive
                })
                .ToListAsync();

            return Ok(members);
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            var memberDto = new MemberDto
            {
                Id = member.Id,
                FirstName = member.FirstName,
                LastName = member.LastName,
                Email = member.Email,
                PhoneNumber = member.PhoneNumber,
                RegistrationDate = member.RegistrationDate,
                IsActive = member.IsActive
            };

            return Ok(memberDto);
        }

        // POST: api/Members
        [HttpPost]
        public async Task<ActionResult<MemberDto>> CreateMember(CreateMemberDto createMemberDto)
        {
            // Check if email already exists
            if (await _context.Members.AnyAsync(m => m.Email == createMemberDto.Email))
            {
                return BadRequest("Email already exists");
            }

            var member = new Member
            {
                FirstName = createMemberDto.FirstName,
                LastName = createMemberDto.LastName,
                Email = createMemberDto.Email,
                PhoneNumber = createMemberDto.PhoneNumber
            };

            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            var memberDto = new MemberDto
            {
                Id = member.Id,
                FirstName = member.FirstName,
                LastName = member.LastName,
                Email = member.Email,
                PhoneNumber = member.PhoneNumber,
                RegistrationDate = member.RegistrationDate,
                IsActive = member.IsActive
            };

            return CreatedAtAction(nameof(GetMember), new { id = member.Id }, memberDto);
        }

        // PUT: api/Members/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(int id, UpdateMemberDto updateMemberDto)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            // Check email uniqueness if email is being updated
            if (updateMemberDto.Email != null && updateMemberDto.Email != member.Email)
            {
                if (await _context.Members.AnyAsync(m => m.Email == updateMemberDto.Email))
                {
                    return BadRequest("Email already exists");
                }
                member.Email = updateMemberDto.Email;
            }

            if (updateMemberDto.FirstName != null)
                member.FirstName = updateMemberDto.FirstName;
            if (updateMemberDto.LastName != null)
                member.LastName = updateMemberDto.LastName;
            if (updateMemberDto.PhoneNumber != null)
                member.PhoneNumber = updateMemberDto.PhoneNumber;
            if (updateMemberDto.IsActive.HasValue)
                member.IsActive = updateMemberDto.IsActive.Value;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}


