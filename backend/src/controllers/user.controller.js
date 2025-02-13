import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from  "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        // console.log(user);
        
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // console.log(accessToken,refreshToken);
        

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser=asyncHandler(async (req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
   
    //get details
    const { email, name, password } = req.body
    console.log("email: ", email);
    console.log(password)
    console.log(name);
    ;
    
    // console.log(req.body);
    

    //validation
    if(
      [email,name,password].some((field)=>
      field?.trim()==="")
      ){
           throw new ApiError(400,"all fields are required")  
      }

  //check for already exist
     const existedUser= await User.findOne({
          $or:[{name},{email}]
      })
      if(existedUser){
          throw new ApiError(409,"User with email or username already exist")
      }

  // check for images, check for avatar...in this step files are at local system means yet not uploaded on cloudinary..
//   const avatarLocalPath=req.files?.avatar[0]?.path
// //   const coverImageLocalPath=req.files?.coverImage[0]?.path
     
//      let coverImageLocalPath;
//      if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
//         coverImageLocalPath=req.files.coverImage[0].path
//      }


//     console.log(req.files);
  

    // if(!avatarLocalPath){
    //     throw new ApiError(400,"Avatar file is required")
    // }

    // upload them to cloudinary, avatar
//     const avatar=await uploadOnCloudinary(avatarLocalPath)
//    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

//    if(!avatar){
//     throw new ApiError(400,"Avatar file is required")
//    }


     // create user object - create entry in db
   const user= await User.create({
        // fullName,
        // avatar:avatar.url,
        // coverImage:coverImage?.url || "",
        email,password,
        name:name.toLowerCase()

    })
       
    console.log(user);
    
    // remove password and refresh token field from response
    const createdUser=await User.findById(user._id).select( //select those we dont want..
        "-password -refreshToken"
    )


    // check for user creation
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    

    // return res
   return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successsfully")
   )
   
})

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
   
    const {email, password} = req.body
    console.log(email);
    // console.log(`${process.env.TMDB_API_KEY}`);
    

    if (!password && !email) {
        throw new ApiError(400, "password or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }
   
    const user = await User.findOne({
        $or: [{email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

 const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
//    console.log(loggedInUser);
   
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser
            },
            "User logged In Successfully"
        )
    )

})

export {registerUser
    ,loginUser,
    // logoutUser,
    //  refreshAccessToken,
    // changeCurrentPassword,
    // getCurrentUser,
    // updateAccountDetails,
    // updateUserAvatar
    // ,updateUserCoverImage
}