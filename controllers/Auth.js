import bcrypt from "bcrypt";
import Users from "../models/Usermodel.js";
import jwt from 'jsonwebtoken';


export const Login = async (req, res) => {
    try {
      const user = await Users.findOne({
        where: {
          nama: req.body.nama,
        },
      });
  
      if (!user) {
        return res.status(404).json({ msg: 'User tidak ditemukan' });
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({msg: "Password Anda Salah!"});
        const userId = user.id;
        const nama = user.nama;
        const role = user.role;
        const accessToken = jwt.sign({userId, nama,role}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const token = jwt.sign({userId, nama,role}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1h'
        });
        await Users.update({token: token},{
            where:{
                id: userId
            }
        });
      res.cookie('token', token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
}

  export const Logout = async(req, res) => {
    const token = req.cookies.token;
    if(!token) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            token: token
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({token: null},{
        where:{
          id: userId
        }
    });
    res.clearCookie('token');
    return res.sendStatus(200);
}

