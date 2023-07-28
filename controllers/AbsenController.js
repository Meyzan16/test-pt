
import e from "cors";
import checkinModel from "../models/checkinModel.js";
import checkoutModel from "../models/checkoutModel.js";


export const checkInController = async (req,res ) => {
    const {userId,checkIn} = req.body
    const datenow = new Date().getDate();
    // const getdate = "";
    
    const getuser = await checkinModel.findOne({user:userId});
    
    if(getuser)
    {
        const getdate = new Date(getuser.checkIn);
        if(getdate.getDate() !== datenow)
            {
                    const {userId,checkIn} = req.body

                    try{
                        await checkinModel.create({
                            user: userId,
                            checkIn
                        })
                        res.status(201).send({
                            success:true,
                            message:"absensi check in successfully for today ",
                        })
                        
                    }catch{
                        console.log(error);
                        res.status(500).send({
                            success:false,
                            message:'Error chekin User',
                            error
                        })
                    }
        
            }else{
                    return res.status(200).send({
                        success:false,
                        message:'absensi check in already for today',
                    })
            }

    }else{
            await checkinModel.create({
                user: userId,
                checkIn
            });

            res.status(201).send({
                success:true,
                message:" absensi check in successfully for today",
            })
    }
}

export const checkOutController = async (req,res ) => {
    const {userId,checkOut} = req.body;
    const datenow = new Date().getDate();
    // const getdate = "";
    
    const getuser = await checkoutModel.findOne({user:userId});
    
    if(getuser){
        const getdate = new Date(getuser.checkOut);
        if(getdate.getDate() !== datenow)
        {
                    try{
                        await checkoutModel.create({
                            user: userId,
                            checkOut
                        });
        
                        res.status(201).send({
                            success:true,
                            message:"User absensi check out successfully ",
                        })
                        
                    }catch{
                        console.log(error);
                        res.status(500).send({
                            success:false,
                            message:'Error checkout User',
                            error
                        })
                    }           
          
    
        }else{
            return res.status(200).send({
                success:false,
                message:'absensi check out already for today',
            })
        }
    }else{
        await checkoutModel.create({
            user: userId,
            checkOut
        });

        res.status(201).send({
            success:true,
            message:"absensi check out successfully ",
        })
    }


}

export const getCheckInSingleController = async (req,res) => {
    try {
        const {id} = req.params
        const userDoc = await checkinModel.findOne({user:id});

        res.status(200).send({
            success:true,
            message:'Get single user absen succesfully',
            userDoc,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single user absen',
            error
        })
    }
}


export const getCheckInController = async (req,res) => {
   
        try {
            const checkIn = await checkinModel.find({}).populate('user');

            res.status(200).send({
                success:true,
                message:'Get single user succesfully',
                checkIn,
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error while getting single user',
                error
            })
        }
    

}

export const getCheckOutController = async (req,res) => {
    
        try {
            const checkOut = await checkoutModel.find({}).populate('user');

            res.status(200).send({
                success:true,
                message:'Get single user succesfully',
                checkOut,
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error while getting single user',
                error
            })
        }
  
}


