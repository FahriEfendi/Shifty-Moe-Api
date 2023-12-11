import Users from "../models/Usermodel.js";


export const verifyUser = async (req, res, next) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Mohon login ke akun Anda!"});
  }
  const user = await Users.findOne({
      where: {
          uuid: req.session.userId
      }
  });
  if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
  req.userId = user.id;
  req.nama = user.nama;
  req.role = user.role; 
  req.jur_id = user.jur_id;
  req.uuid = user.uuid;
  req.dosen_id = user.dosen_id;
  next();
}
  
export const adminOnly = async (req, res, next) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if (user.role !== 3 && user.role !== 5 && user.role !== 9) {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
    next();
}