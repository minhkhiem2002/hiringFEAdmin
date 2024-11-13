//Validate Form

export const validate = (values) => {
  let errors = { HovaTendem: "", Ten: "", Dienthoai: "", Mail: "" };

  //Regex patterns
  const namePattern = /^[a-zA-ZÀ-ỹ\s]+$/; 
  const phonePattern = /^(?:\+?84|0)[35789]\d{8}$/;
  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Validate Họ và Tên
  if (!values.HovaTendem) {
    errors.HovaTendem = "Nhập họ và tên đệm";
  } else if (!namePattern.test(values.HovaTendem)) {
    errors.HovaTendem = "Họ tên đệm không hợp lệ";
  }

  if (!values.Ten) {
    errors.Ten = "Nhập tên";
  } else if (!namePattern.test(values.Ten)) {
    errors.Ten = "Không hợp lệ";
  }

  //Validate Số điện thoại
  if (values.Dienthoai && !phonePattern.test(values.Dienthoai)) {
    errors.Dienthoai = "Số điện thoại không hợp lệ";
  }

  //Validate email
  if (!values.Mail) {
    errors.Mail = "Vui lòng nhập Email";
  } else if (!emailPattern.test(values.Mail)) {
    errors.Mail = "Email không hợp lệ";
  }

  return errors;
};

export const validateTTC = (values) => {
  let errors = {
      Dienth: "",
      Nlb: ""
  };

  // Regex patterns
  const phonePattern = /^(?:\+?84|0)[35789]\d{8}$/;
  const namePattern = /^[a-zA-ZÀ-ỹ\s]+$/;

  // Validate số điện thoại
  if (!values.Dienth) {
      errors.Dienth = "Nhập số điện thoại";
  } else if (!phonePattern.test(values.Dienth)) {
      errors.Dienth = "Số điện thoại không hợp lệ";
  }

  // Validate người lập biểu
  if (!values.Nlb) {
      errors.Nlb = "Nhập người lập biểu";
  } else if (!namePattern.test(values.Nlb)) {
      errors.Nlb = "Người lập biểu không hợp lệ";
  }

  return errors;
};

export const formatDateKetXuat = (date) => {
if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();

return `${day}/${month}/${year}`;
};

export const formatDateTimeKetXuat = (date) => {
if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();

const hours24 = date.getHours();
const hours12 = hours24 % 12 || 12; 
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');
const ampm = hours24 >= 12 ? 'PM' : 'AM'; 

return `${day}/${month}/${year} ${hours12}:${minutes}:${seconds} ${ampm}`;
};


export function formatDate(dateString) {
if(!dateString) return '';
const date = new Date(dateString);
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const year = date.getFullYear();

return `${day}/${month}/${year}`;
}

export function isValidVietnamesePhoneNumber(phoneNumber) {
const vietnamesePhoneRegex = /^(?:\+84|0)(?:[3|5|7|8|9]\d{8})$/;
return vietnamesePhoneRegex.test(phoneNumber);
}


export function isValidEmail(email) {
// Regex pattern for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}


export function formDataToObject (formData) {
const obj = {};
formData.forEach((value, key) => {
    // Check if key is 'values'
    if (key === 'values') {
        try {
            // Parse JSON string to object
            Object.assign(obj, JSON.parse(value));
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    } else {
        // Handle other formData entries if needed
        obj[key] = value;
    }
});
return obj;
};