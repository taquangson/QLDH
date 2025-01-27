using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class FlashCardModel
    {
        public int ID { get; set; }
        public string ChuDe { get; set; }
        public string The { get; set; }
        public string Ten { get; set; }
        public string AnhThe { get; set; }
        public string AmThanh { get; set; }
    }
}