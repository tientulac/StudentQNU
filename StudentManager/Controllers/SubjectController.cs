using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class SubjectController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/subject")]
        public ResponseBase<List<Subject>> GetList()
        {
            try
            {
                return new ResponseBase<List<Subject>>
                {
                    data = db.Subjects.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Subject>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/subject")]
        public ResponseBase<bool> Save(Subject req)
        {
            try
            {
                if (req.SubjectId > 0)
                {
                    var _sb = db.Subjects.FirstOrDefault(x => x.SubjectId == req.SubjectId);
                    _sb.SubjectCode = req.SubjectCode;
                    _sb.SubjectName = req.SubjectName;
                    _sb.UpdatedAt = DateTime.Now;
                    db.SubmitChanges();
                }
                else
                {
                    req.CreatedAt = DateTime.Now;
                    db.Subjects.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/subject")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _class = db.Subjects.FirstOrDefault(x => x.SubjectId == id);
                db.Subjects.DeleteOnSubmit(_class);
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