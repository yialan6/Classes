import "./Class.css";
import React, {useState, useEffect} from 'react';


function ClassGraphQL(props) {

    const [classInfo, setClassInfo] = useState({});
    const url = "https://api.peterportal.org/graphql/"

    useEffect(() => {
        const fetchData = async () => {
            const query = `
            query {
                course(id: "${props.name}"){
                    title
                    department_name
                    description
                    instructor_history {
                        name
                        department
                    }
                }
            }`;
        
            const response = await fetch(url, {
                "method": "POST",
                "body": JSON.stringify({query}),
                "headers": {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            await setClassInfo(data.data.course);
        } 
        fetchData();
    }, [props.name]);

    let info;
    if(classInfo.instructor_history) {
        console.log(classInfo)
        info = <div className = 'information'>
            <p id='title'>{classInfo.title}</p>
            <p id='department'>{classInfo.department_name}</p>
            <p id='description'>{classInfo.description}</p>
            <p id='history'>
                <p>Previous Instructors:</p>
                {classInfo.instructor_history.map(instructor =>
                    <li key={instructor.name}>{instructor.name}</li> 
                )}
            </p>
        </div>
    } else if (classInfo == null) {
        info = <p>Class Not Found</p>
    } else {
        info = <p>Loading...</p>
    }

    return (
        <body>
            <div className='class'>
                <div id='className'>
                    {props.name}
                </div>
                <div>
                    {info}
                </div>
            </div>
        </body>
    )
}

export default ClassGraphQL;