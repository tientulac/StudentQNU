using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class PointTypeController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/point-type")]
        public ResponseBase<List<PointType>> GetList()
        {
            try
            {
                return new ResponseBase<List<PointType>>
                {
                    data = db.PointTypes.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<PointType>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/point-type")]
        public ResponseBase<bool> Save(PointType req)
        {
            try
            {
                if (req.PointTypeId > 0)
                {
                    var _pointType = db.PointTypes.FirstOrDefault(x => x.PointTypeId == req.PointTypeId);
                    _pointType.PointTypeCode = req.PointTypeCode;
                    _pointType.PointTypeName = req.PointTypeName;
                    _pointType.Descrip = req.Descrip;
                    _pointType.UpdatedAt = DateTime.Now;
                    db.SubmitChanges();
                }
                else
                {
                    req.CreatedAt = DateTime.Now;
                    db.PointTypes.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/point-type")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _class = db.PointTypes.FirstOrDefault(x => x.PointTypeId == id);
                db.PointTypes.DeleteOnSubmit(_class);
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