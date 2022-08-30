import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        work: "",
        address: "",
        des: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, age, phone, work, address, des } = inpval;

        const res = await fetch("http://localhost:8003/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, phone, work, address, des
            })
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputName1" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputName1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={setdata} value={inpval.email} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputAge1" className="form-label">Age</label>
                        <input type="text" onChange={setdata} value={inpval.age} name="age" className="form-control" id="exampleInputAge1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputPhone1" className="form-label">Mobile Number</label>
                        <input type="number" onChange={setdata} value={inpval.phone} name="phone" className="form-control" id="exampleInputPhone1" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputwork1" className="form-label">Work</label>
                        <input type="text" onChange={setdata} value={inpval.work} name="work" className="form-control" id="exampleInputwork1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputAddress1" className="form-label">Address</label>
                        <input type="text" onChange={setdata} value={inpval.address} name="address" className="form-control" id="exampleInputAddress1" />
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea onChange={setdata} value={inpval.des} name="des" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register