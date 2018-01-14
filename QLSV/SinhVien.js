 function SinhVien(hoten_,email,cmnd,sodt)
{
	this.HoTen = hoten_;
	this.Email = email;
	this.CMND = cmnd;
	this.SoDT = sodt;
}

// Export nhiều function cùng lúc
module.exports = {SinhVien:SinhVien};