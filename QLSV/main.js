// import {DanhSachSinhVien} from './DanhSachSinhVien.js';
// import {SinhVien} from './SinhVien.js';

import {DanhSachSinhVien} from './DanhSachSinhVien.js';
import {SinhVien} from './SinhVien.js';
require("./style.css");
require("./style.scss");

//Khởi tạo 1 danh sách sinh viên
var danhSachSinhVien = new DanhSachSinhVien();

SinhVien.prototype.MaSV = '';

//Xây dựng chức năng thêm sinh viên
function ThemSinhVien()
{
	var HoTen = document.getElementById('hoten').value;
	var MaSV = document.getElementById('masv').value;
	var CMND = document.getElementById('cmnd').value;
	var Email = document.getElementById('email').value;
	var SDT = document.getElementById('sdt').value;
	//Khởi tạo đối tượng sinh viên từ prototype SinhVien
	var sinhVienThem = new SinhVien(HoTen,Email,CMND,SDT);
	sinhVienThem.MaSV = MaSV;
	
	//Thêm sinh viên vào đối tượng danhsachsinhvien
	danhSachSinhVien.ThemSinhVien(sinhVienThem);
	//Gọi phương thức cập nhật listbox
	CapNhatSinhVien(danhSachSinhVien);
}
window.ThemSinhVien = ThemSinhVien;



//Thêm phương thức XoaSinhVien cho prototypeSinhVien
DanhSachSinhVien.prototype.XoaSV = function(arrSVDuocChon){
	//Duyệt mảng sinh viên được chọn với mảng danh sách sinh viên tìm ra sinh viên xóa
	for(var i=0; i<arrSVDuocChon.length;i++)
	{
		for(var j=0;j<this.DSSV.length;j++)
		{
			if(arrSVDuocChon[i] == this.DSSV[j].MaSV )
			{
				this.DSSV.splice(j,1);
			}
		}
	}
}

function XoaSinhVien()
{
	var arrSVDuocChon = [];
	var lstSinhVien = document.getElementsByClassName('ckbSV');
	for(var i = 0; i<lstSinhVien.length;i++)
	{
		if(lstSinhVien[i].checked)
		{
			var MaSV = lstSinhVien[i].value;
			arrSVDuocChon.push(MaSV);
		}
	}
	danhSachSinhVien.XoaSV(arrSVDuocChon);
	CapNhatSinhVien(danhSachSinhVien);
}
window.XoaSinhVien= XoaSinhVien;


DanhSachSinhVien.prototype.TimSinhVien = function (tukhoa)
{
	//Tạo 1 đối tượng danh sách sinh viên mới
	var dsSVTimKiem = new DanhSachSinhVien();
	//Duyệt danh sách sinh viên
	for(var i=0;i<danhSachSinhVien.DSSV.length;i++)
	{
		var sinhvien = danhSachSinhVien.DSSV[i];
		if(sinhvien.HoTen.search(tukhoa)!=-1)
		{
			dsSVTimKiem.ThemSinhVien(sinhvien);
		}
	}
	return dsSVTimKiem;
}

function TimKiemSinhVien()
{
	var tukhoa = document.getElementById("tukhoa").value;
	var dsSinhVien = danhSachSinhVien.TimSinhVien(tukhoa);
	if(dsSinhVien.DSSV.length != 0 )
	{
		document.getElementById("ThongBao").innerHTML = 'Tìm thấy ' + dsSinhVien.DSSV.length + ' sinh viên !'; 
		CapNhatSinhVien(dsSinhVien);
	}
	else
	{
		document.getElementById("ThongBao").innerHTML = 'Không tìm thấy sinh viên nào!'; 
	}
}
window.TimKiemSinhVien = TimKiemSinhVien;



function CapNhatSinhVien(dsSinhVien)
{
		var tbodySinhVien = document.getElementById('tbodySinhVien');
		tbodySinhVien.innerHTML='';
		for(var i = 0; i < dsSinhVien.DSSV.length; i++)
		{
			//Lấy đối tượng sinh viên từ mảng DSSV
			var sv = dsSinhVien.DSSV[i];
			//Tạo thẻ tr
			var trSinhVien = document.createElement('tr');
			var ckbSV = document.createElement('input');
			ckbSV.setAttribute('type','checkbox');
			ckbSV.value=sv.MaSV;
			ckbSV.className = 'ckbSV';
			//Tạo cột checkbox 
			var tdCheckBox = document.createElement('td');
			tdCheckBox.appendChild(ckbSV);
			trSinhVien.appendChild(tdCheckBox);
			//Tạo các td thuộc tính
			var tdMaSV = TaoTD('MaSV',sv.MaSV);
			var tdHoTen = TaoTD('HoTen',sv.HoTen);
			var tdEmail = TaoTD('Email',sv.Email);
			var tdCMND = TaoTD('CMND',sv.CMND);
			var tdSDT = TaoTD('SDT',sv.SoDT);
			trSinhVien.appendChild(tdMaSV);
			trSinhVien.appendChild(tdHoTen);
			trSinhVien.appendChild(tdEmail);
			trSinhVien.appendChild(tdCMND);
			trSinhVien.appendChild(tdSDT);
			tbodySinhVien.appendChild(trSinhVien);
		}
}

function TaoTD(className, Value)
{
	var td = document.createElement('td');
	td.className = className;
	td.innerHTML = Value;
	return td;
}
window.TaoTD = TaoTD;
function SetStorage()
{	
	
	//Convert danh sách sinh viên thành json 
	var jsonDSSV = JSON.stringify(danhSachSinhVien.DSSV);
	localStorage.setItem("DanhSachSinhVien", jsonDSSV);
}
window.SetStorage = SetStorage;

function GetStorage()
{
    danhSachSinhVien.DSSV = JSON.parse(localStorage.getItem("DanhSachSinhVien"));
	CapNhatSinhVien(danhSachSinhVien);

}
window.GetStorage = GetStorage;
require("./style.css");