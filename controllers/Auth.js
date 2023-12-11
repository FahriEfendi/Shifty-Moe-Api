
import bcrypt from "bcrypt";
import Users from "../models/Usermodel.js";

export const Login = async(req, res) => {
    const user = await Users.findOne({
        where: {
            nama: req.body.nama
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});    
    const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({msg: "Password Salah!"});
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const nama = user.nama;
        const role = user.role;
        
        res.status(200).json({uuid, nama, role});   
}


export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Users.findOne({
        attributes:['uuid','nama','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}


