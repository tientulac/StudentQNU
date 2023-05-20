using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class StudentPointController: ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/student-point")]
        public ResponseBase<List<StudentPoint>> GetList()
        {
            try
            {
                return new ResponseBase<List<StudentPoint>>
                {
                    data = db.StudentPoints.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<StudentPoint>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/student-point")]
        public ResponseBase<bool> Save(StudentPoint req)
        {
            try
            {
                if (req.StudentPointId > 0)
                {
                    var _stPoint = db.StudentPoints.FirstOrDefault(x => x.StudentPointId == req.StudentPointId);
                    _stPoint.PointTypeId = req.PointTypeId;
                    _stPoint.Point = req.Point;
                    _stPoint.SubjectId = req.SubjectId;
                    _stPoint.UpdatedAt = DateTime.Now;
                }
                else
                {
                    req.CreatedAt = DateTime.Now;
                    db.StudentPoints.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/student-point")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _studentPoint = db.StudentPoints.FirstOrDefault(x => x.StudentPointId == id);
                db.StudentPoints.DeleteOnSubmit(_studentPoint);
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