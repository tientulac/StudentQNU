using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class StudentController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/student")]
        public ResponseBase<List<StudentDTO>> GetList()
        {
            try
            {
                return new ResponseBase<List<StudentDTO>>
                {
                    data = db.Students.Select(x => new StudentDTO { 
                        StudentId = x.StudentId,
                        StudentCode = x.StudentCode,
                        FullName = x.FullName,
                        Age = x.Age,
                        GenreId = x.GenreId,
                        MajorId = x.MajorId,
                        SchoolYearId = x.SchoolYearId,
                        Email = x.Email,
                        Phone = x.Phone,
                        Address = x.Address,
                        Status = x.Status,
                        AdmisionDate = x.AdmisionDate,
                        CreatedAt = x.CreatedAt,
                        UpdatedAt = x.UpdatedAt,
                        DeletedAt = x.DeletedAt,
                        Gender = x.Gender,
                        Birth = x.Birth,
                        GenreName = db.Genres.FirstOrDefault(m => m.GenreId == x.GenreId).GenreName ?? "",
                        MajorName = db.Majors.FirstOrDefault(m => m.MajorId == x.MajorId).MajorName ??  "",
                        SchoolYearName = db.SchoolYears.FirstOrDefault(m => m.SchoolYearId == x.SchoolYearId).SchoolYearName ??  "",
                    }).ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<StudentDTO>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/student/get-by-class")]
        public ResponseBase<List<StudentDTO>> GetByClass(int id)
        {
            try
            {
                var listIdStudent = db.StudentClasses.Where(x => x.ClassId == id).Select(s => s.StudentId);
                var listStudent = db.Students.Where(s => listIdStudent.Any(x => x.GetValueOrDefault() == s.StudentId));
                return new ResponseBase<List<StudentDTO>>
                {
                    data = listStudent.Select(x => new StudentDTO
                    {
                        StudentId = x.StudentId,
                        StudentCode = x.StudentCode,
                        FullName = x.FullName,
                        Age = x.Age,
                        GenreId = x.GenreId,
                        MajorId = x.MajorId,
                        SchoolYearId = x.SchoolYearId,
                        Email = x.Email,
                        Phone = x.Phone,
                        Address = x.Address,
                        Status = x.Status,
                        AdmisionDate = x.AdmisionDate,
                        CreatedAt = x.CreatedAt,
                        UpdatedAt = x.UpdatedAt,
                        DeletedAt = x.DeletedAt,
                        Gender = x.Gender,
                        Birth = x.Birth,
                        GenreName = db.Genres.FirstOrDefault(m => m.GenreId == x.GenreId).GenreName ?? "",
                        MajorName = db.Majors.FirstOrDefault(m => m.MajorId == x.MajorId).MajorName ?? "",
                        SchoolYearName = db.SchoolYears.FirstOrDefault(m => m.SchoolYearId == x.SchoolYearId).SchoolYearName ?? "",
                    }).ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<StudentDTO>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/student")]
        public ResponseBase<bool> Save(Student req)
        {
            try
            {
                if (req.StudentId > 0)
                {
                    var _student = db.Students.FirstOrDefault(x => x.StudentId == req.StudentId);
                    _student.FullName = req.FullName;
                    _student.Age = req.Age;
                    _student.GenreId = req.GenreId;
                    _student.MajorId = req.MajorId;
                    _student.SchoolYearId = req.SchoolYearId;
                    _student.Email = req.Email;
                    _student.Phone = req.Phone;
                    _student.Address = req.Address;
                    _student.Status = req.Status;
                    _student.AdmisionDate = req.AdmisionDate;
                    _student.UpdatedAt = DateTime.Now;
                    db.SubmitChanges();
                }
                else
                {
                    req.CreatedAt = DateTime.Now;
                    db.Students.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<bool>
                {
                    data = true,
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpDelete, Route("api/v1/student")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _student = db.Students.FirstOrDefault(x => x.StudentId == id);
                db.Students.DeleteOnSubmit(_student);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    data = true,
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }
    }
}