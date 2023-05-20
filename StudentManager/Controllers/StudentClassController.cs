using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class StudentClassController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/student-class")]
        public ResponseBase<List<StudentClass>> GetList()
        {
            try
            {
                return new ResponseBase<List<StudentClass>>
                {
                    data = db.StudentClasses.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<StudentClass>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/student-class")]
        public ResponseBase<bool> Save(StudentClass req)
        {
            try
            {
                db.StudentClasses.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/student-class")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _StudentClass = db.StudentClasses.FirstOrDefault(x => x.StudentClassId == id);
                db.StudentClasses.DeleteOnSubmit(_StudentClass);
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