import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const LoginStud = () => {
    const [studentData, setStudentData] = useState({});
    const navigate = useNavigate();
     // fetching from mongo db student data using id
     useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/students/${student_id}`);
                setStudentData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details.");
            }
        };

        fetchStudentData();
    }, [student_id]);

    const formSubmit = (e) => {
        e.preventDefault();
        
        console.log("Form Submitted");
        navigate('/dashboard');
    }


    return (
        <div className="container-fluid">
            <div className="row mt-4 justify-content-center">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="row row-gap-3">
                                    <div className="col-12">
                                        <label htmlFor="">Email</label>
                                        <input name="empEmail" type="email" placeholder="Email" className="form-control" />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="">Password</label>
                                        <input name="empEmail" type="password" placeholder="Password" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-10">
                                    <div className="col-12 mt-4 d-flex justify-content-start">
                                        <button className="btn btn-primary" type="submit">Login</button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginStud;