import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from '../context/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const schema = yup.object({
  email: yup.string().email(),
  mobile_number: yup.string(),
  user_name: yup.string(),
  country_code: yup.string(),
  name: yup.string(),
  first_name: yup.string(),
  last_name: yup.string(),
  profile_image: yup.string(),
  display_name: yup.string(),
  county: yup.string(),
  state: yup.string(),
  city: yup.string(),
  pincode: yup.string(),
  address: yup.string(),
});

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [auth, setAuth] = useAuth();

  const onSubmit = async (data) => {
    const token = auth.jwt_token;

    try {
      console.log(token)
      const response = await axios.put('https://stgapi-bnpl.tarality.io/api/v0/user/updateProfile', {
        // token: token,
        updateProfile: data
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',}});

      console.log('API Response:', response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      toast.error(`Error updating profile: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div className="mb-3">
            <label>Email</label>
            <input type="text" {...register('email')} className="form-control" />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label>Mobile Number</label>
            <input type="text" {...register('mobile_number')} className="form-control" />
            {errors.mobile_number && <p className="text-danger">{errors.mobile_number.message}</p>}
          </div>

          <div className="mb-3">
            <label>User Name</label>
            <input type="text" {...register('user_name')} className="form-control" />
            {errors.user_name && <p className="text-danger">{errors.user_name.message}</p>}
          </div>

          <div className="mb-3">
            <label>Country Code</label>
            <input type="text" {...register('country_code')} className="form-control" />
            {errors.country_code && <p className="text-danger">{errors.country_code.message}</p>}
          </div>

          <div className="mb-3">
            <label>Name</label>
            <input type="text" {...register('name')} className="form-control" />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input type="text" {...register('first_name')} className="form-control" />
            {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" {...register('last_name')} className="form-control" />
            {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
          </div>

          <div className="mb-3">
            <label>Profile Image</label>
            <input type="text" {...register('profile_image')} className="form-control" />
            {errors.profile_image && <p className="text-danger">{errors.profile_image.message}</p>}
          </div>

          <div className="mb-3">
            <label>Display Name</label>
            <input type="text" {...register('display_name')} className="form-control" />
            {errors.display_name && <p className="text-danger">{errors.display_name.message}</p>}
          </div>

          <div className="mb-3">
            <label>County</label>
            <input type="text" {...register('county')} className="form-control" />
            {errors.county && <p className="text-danger">{errors.county.message}</p>}
          </div>

          <div className="mb-3">
            <label>State</label>
            <input type="text" {...register('state')} className="form-control" />
            {errors.state && <p className="text-danger">{errors.state.message}</p>}
          </div>

          <div className="mb-3">
            <label>City</label>
            <input type="text" {...register('city')} className="form-control" />
            {errors.city && <p className="text-danger">{errors.city.message}</p>}
          </div>

          <div className="mb-3">
            <label>Pincode</label>
            <input type="text" {...register('pincode')} className="form-control" />
            {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input type="text" {...register('address')} className="form-control" />
            {errors.address && <p className="text-danger">{errors.address.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormComponent;








































// import React from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import axios from 'axios';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useAuth } from '../context/Auth';
// const schema = yup.object({
//   email: yup.string().email().required(),
//   mobile_number: yup.string().required(),
//   user_name: yup.string().required(),
//   country_code: yup.string(),
//   name: yup.string(),
//   first_name: yup.string(),
//   last_name: yup.string(),
//   profile_image: yup.string(),
//   display_name: yup.string(),
//   county: yup.string(),
//   state: yup.string(),
//   city: yup.string(),
//   pincode: yup.string(),
//   address: yup.string(),
// });

// const FormComponent = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema)
//   });

//   const [auth,setAuth]=useAuth()

//   const onSubmit = async (data) => {
//     // Assuming you have a token from your authentication process
//     const token = auth.jtw_token

//     try {
//       const response = await axios.put('https://stgapi-bnpl.tarality.io/api/v2/user/updateProfile', {
//         token: token,
//         updateProfile:data
//       });

//       console.log('API Response:', response.data);
//       // Handle success, show message or redirect user

//     } catch (error) {
//       console.error('API Error:', error);
//       // Handle error, show error message to user
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>Email</label>
//       <input type="text" {...register('email')} />
//       {errors.email && <p>{errors.email.message}</p>}

//       <label>Mobile Number</label>
//       <input type="text" {...register('mobile_number')} />
//       {errors.mobile_number && <p>{errors.mobile_number.message}</p>}

//       <label>User Name</label>
//       <input type="text" {...register('user_name')} />
//       {errors.user_name && <p>{errors.user_name.message}</p>}

//       <label>Country Code</label>
//       <input type="text" {...register('country_code')} />
//       {errors.country_code && <p>{errors.country_code.message}</p>}

//       <label>Name</label>
//       <input type="text" {...register('name')} />
//       {errors.name && <p>{errors.name.message}</p>}

//       <label>First Name</label>
//       <input type="text" {...register('first_name')} />
//       {errors.first_name && <p>{errors.first_name.message}</p>}

//       <label>Last Name</label>
//       <input type="text" {...register('last_name')} />
//       {errors.last_name && <p>{errors.last_name.message}</p>}

//       <label>Profile Image</label>
//       <input type="text" {...register('profile_image')} />
//       {errors.profile_image && <p>{errors.profile_image.message}</p>}

//       <label>Display Name</label>
//       <input type="text" {...register('display_name')} />
//       {errors.display_name && <p>{errors.display_name.message}</p>}

//       <label>County</label>
//       <input type="text" {...register('county')} />
//       {errors.county && <p>{errors.county.message}</p>}

//       <label>State</label>
//       <input type="text" {...register('state')} />
//       {errors.state && <p>{errors.state.message}</p>}

//       <label>City</label>
//       <input type="text" {...register('city')} />
//       {errors.city && <p>{errors.city.message}</p>}

//       <label>Pincode</label>
//       <input type="text" {...register('pincode')} />
//       {errors.pincode && <p>{errors.pincode.message}</p>}

//       <label>Address</label>
//       <input type="text" {...register('address')} />
//       {errors.address && <p>{errors.address.message}</p>}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FormComponent;
