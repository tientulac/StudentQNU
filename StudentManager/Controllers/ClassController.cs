using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class ClassController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/class")]
        public ResponseBase<List<ClassDTO>> GetList()
        {
            try
            {
                return new ResponseBase<List<ClassDTO>>
                {
                    data = db.Classes.Select(x => new ClassDTO
                    {
                        ClassId = x.ClassId,
                        ClassCode = x.ClassCode,
                        ClassName = x.ClassName,
                        Room = x.Room,
                        Lession = x.Lession,
                        Teacher = x.Teacher,
                        Slot = x.Slot,
                        Descrip = x.Descrip,
                        SubjectId = x.SubjectId,
                        CreatedAt = x.CreatedAt,
                        UpdatedAt = x.UpdatedAt,
                        DeletedAt = x.DeletedAt,
                        SubjectName = db.Subjects.FirstOrDefault(c => c.SubjectId == x.SubjectId).SubjectName ?? ""
                    }).ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ClassDTO>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/class")]
        public ResponseBase<bool> Save(Class req)
        {
            try
            {
                if (req.ClassId > 0)
                {
                    var _class = db.Classes.FirstOrDefault(x => x.ClassId == req.ClassId);
                    _class.ClassCode = req.ClassCode;
                    _class.ClassName = req.ClassName;
                    _class.Room = req.Room;
                    _class.Lession = req.Lession;
                    _class.Teacher = req.Teacher;
                    _class.Slot = req.Slot;
                    _class.Descrip = req.Descrip;
                    _class.SubjectId = req.SubjectId;
                    _class.UpdatedAt = DateTime.Now;
                    db.SubmitChanges();
                }
                else
                {
                    req.CreatedAt = DateTime.Now;
                    db.Classes.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/class")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _class = db.Classes.FirstOrDefault(x => x.ClassId == id);
                db.Classes.DeleteOnSubmit(_class);
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

        [HttpPost, Route("api/v1/class/add-student")]
        public ResponseBase<bool> AddStudent(ClassDTO req)
        {
            try
            {
                if (req.ClassId > 0)
                {
                    var listStudent = db.StudentClasses.Where(x => x.ClassId == req.ClassId);
                    db.StudentClasses.DeleteAllOnSubmit(listStudent);
                    db.SubmitChanges();
                    req.ListStudentId.ForEach(x =>
                    {
                        db.StudentClasses.InsertOnSubmit(new StudentClass
                        {
                            ClassId = req.ClassId,
                            StudentId = x,
                            Status = 1
                        });
                        db.SubmitChanges();
                    });
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
    }
}