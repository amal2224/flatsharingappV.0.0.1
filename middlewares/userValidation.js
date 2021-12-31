const {check,validationResult }=require("express-validator")
// it an array that handle the error types
exports.registerValidation=()=>[
    check("email","please check your email").isEmail(),
    check("password" , "please check your password").isLength({min:6}),
    check("fullName", "please check your fullName").matches(/^[a-z ]+$/i).notEmpty(),
    check("sex","please check your sex").notEmpty(),
];

exports.loginValidation=()=>[
    check("email","please check your email").isEmail().notEmpty(),
    check("password" , "please check your password").isLength({min:6}),    
]

exports.fullNameValidation=()=>[
    check("fullName","please check your fullName").matches(/^[a-z ]+$/i),    
]

exports.phoneValidation=()=>[
    check("phoneNumber","please check your phoneNumber").isNumeric().isLength({ min: 8, max: 8 }),    
]

exports.addressValidation=()=>[
    check("address","please check your address").notEmpty(),    
]

exports.facebookValidation=()=>[
    check("facebook","Invalid website url").isURL(),
]

exports.twitterValidation=()=>[
    check("twitter","Invalid website url").isURL(),
]

exports.instagramValidation=()=>[
    check("instagram","Invalid website url").isURL(),
]
exports.emailValidation=()=>[
    check("email","please check your email").isEmail(),
]
exports.passwordValidation=()=>[
    check("newPassword" , "Password error").isLength({min:6}),

]
// Validation fn , take array of errors and return the type of error
exports.Validation=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}