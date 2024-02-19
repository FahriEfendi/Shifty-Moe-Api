import Users from "../models/Usermodel.js";
import jwt from "jsonwebtoken";


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
  
export const adminOnly = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Mengambil token dari cookie

        if (!token) {
            return res.status(401).json({ message: "Mohon login ke akun Anda!" });
        }

        const decoded = jwt.verify(token, '2131fwhdfh56e2s7j8'); // Ganti 'secretKey' dengan secret key Anda

        const user = await Users.findOne({
            where: {
                id: decoded.userId
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        if (user.role !== 1) {
            return res.status(403).json({ message: "Akses terlarang" });
        }

        next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(401).json({ msg: "Token tidak valid" });
    }
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.nama = decoded.nama;
        req.role = decoded.role; 
        next();
    })
}

export const Token = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                uuid: token
            }
        });
        if (!user) return res.sendStatus(403);
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Token kedaluwarsa
                return res.status(401).json({ message: "Mohon login ulang" });
            }

            // Ambil nilai 'nama' dari payload JWT
            const nama = decoded.nama;
            const userId = decoded.userId;
            const role = decoded.role;
           
            const accessToken = jwt.sign({ nama }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ nama,token,userId,role });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}

export const internalEndpointMiddleware  = async  (req, res, next) => {
    if (req.headers[process.env.INTERNAL_TOKEN] === process.env.INTERNAL_TOKEN) {
        // Lakukan validasi tambahan jika diperlukan
        next(); // Lanjutkan jika kunci token internal cocok
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

