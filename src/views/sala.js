import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Card, Input, Form } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import ScheduleSelector from 'react-schedule-selector';
import axios from "axios";
import { Header } from 'antd/lib/layout/layout';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import  LoadingScreen  from 'react-loading-screen';
import Logo from '../logo.gif';



let api = "https://sala-tutorxs.herokuapp.com"
const googleKey = process.env.REACT_APP_GOOGLE;
// api = "http://localhost:5000"


const style = { background: '#0092ff', padding: '8px 0' };
// GET de array u obj, buscar fecha y obtener personas anotadas
/*const horarios = [
    {
        'date': "2021-08-30 1:00:00",
        'nombres': ['tesurot'],
        'espacios': 1
    }
]; */




//let  useEffect();

// console.log(horarios)



let horarios = []
let cupos = 0
let cupos0 = '(0/4)'
let valor = 0;



let url = `${api}/week` //"https://sala-tutorxs.herokuapp.com/week";
function loadSchedule () {    
        

        axios
        .get(url, {}, {headers: {"Access-Control-Allow-Origin": "*"}})
                                    
        .then((response) => {

        horarios = response["data"]['schedule'];
        cupos = response["data"]['cupos'];
        cupos0 = response["data"]['cupos_0'];

        })
        .catch((err) => {
        console.log(err);
        if (err.response) {
        } else {
        }

        });

        console.log("oli")

    };

loadSchedule();

export default function HorariosSala() {

    const [schedule, setSchedule] = useState({});
    const [nombre, setNombre] = useState('');
    const [selected, setSelected] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [week, setWeek] = useState(new Date())
    const [isLoading, setIsLoading] = useState(true)
    const [firstLoading, setFirstLoading] = useState(false)
    const [googleImage, setGoogleImage] = useState("")
    const [nombreNew, setNombreNew] = useState('')
    const [tutore, setTutore] = useState({"email": "",
                                        "nombre": "",
                                        "gds": "",
                                        "apodo": "",
                                        "pronombre": "",
                                        "tiene_llave": false,
                                        "gda": "",
                                        "rol": []
                                        })
    // const [rol, setRol] = useState(false)
    // const [form] = Form.useForm();
    let tiempo_paso = false;
    function reloadSchedule () {    axios
        .get(url, {}, {headers: {"Access-Control-Allow-Origin": "*"}})
                                    
        .then((response) => {
        
            // console.log(response["data"])
            // console.log(`aaa ${response["data"]}`)
            
        horarios = response["data"]['schedule'];
        valor = new Date(horarios[0]["date"]);
        setWeek(valor);
        cupos = response["data"]['cupos'];
        cupos0 = response["data"]['cupos_0'];
        setSchedule({})

        })
        .catch((err) => {
        console.log(err);
        if (err.response) {
        } else {
        }

        });
        
        // setIsLoading(false)
        //console.log(`aaa ${week}`)
        // https://www.sitepoint.com/delay-sleep-pause-wait/
        function sleep(s) {
            return new Promise(resolve => setTimeout(resolve, s))
          
        }
        sleep(2000)
        .then( () => {
                //setIsLoading(false);
                console.log("deberia salirse la carga");
                tiempo_paso = true;

        })
         

    };
    useEffect(() => {
        if(tiempo_paso === true){
            //setIsLoading(false);
            console.log("deberia salirse po");
        }
    }, [tiempo_paso]);

    const responseGoogle = (response) => {
        reloadSchedule();
        
        //console.log(week)
        // console.log(response);
        console.log("AAA", response);
        
        if (response && "Ws" in response) {
        setEmail(response["Ws"]["Ht"])
        setName(response["Ws"]["Qe"])
        setGoogleImage(response["Ws"]["wJ"])
        
        let url = `${api}/tutore?email=` + response["Ws"]["Ht"] //"https://sala-tutorxs.herokuapp.com/week";
        axios
        .get(url, {}, { headers: {"Access-Control-Allow-Origin": "*"}})                         
        .then((response) => {
            setTutore(response["data"])
            setNombre(response["data"]["apodo"])
            setNombreNew(response["data"]["apodo"])
            // setRol(response["data"]["rol"])
        })
        .catch((err) => {
        console.log(err);
        if (err.response) {
        } else {
        }
        });
        
        } else {
            setEmail("")
            setName("")
            setTutore({"email": "", "nombre": "", "pronombre": "",
                    "apodo": "", "gds": "", "tiene_llave": false,
                    "rol": [], "gda": "" })
        }

        //setNombre(tutore["apodo"])
        //setIsLoading(false);
        reloadSchedule();
      }

    
    const handleChange = (newSchedule) => {
        // console.log(newSchedule)
        setSchedule({ schedule: newSchedule });
    }

    const check_espacios = (time) => {
        for(let i in horarios){
            if(Date.parse(new Date(horarios[i]['date'])) === Date.parse(time)){
                
                return `${horarios[i]['cupos']}`;
                // return `(${horarios[i]['espacios']}/4)`;
            }
        }
        return cupos0
    }

    let colorSelected = 'rgba(89, 154, 242, 1)'
    let colorNotSelected = 'rgba(162, 198, 248, 1)'
    let colorMouse = '#dbedff'

    const colors = (time) => {

        let verde = true;
        let not = false;
        let anotade = false;

        for (let i in horarios) {
            if (Date.parse(new Date( horarios[i]['date'] )) === Date.parse(time)) {
                verde = horarios[i]['verde'];
                not = horarios[i]['not'];
                //console.log("AAA")
                if (email) {
                    // console.log("ES EMAIL", horarios[i]["nombres"])

                    if (horarios[i]['emails'].includes(email)) {
                        //console.log("ESTÄ EL EMAIL ")
                        anotade = true;
                    }
                }

            }
        }

          if ( !verde ) {

            colorSelected = 'rgba(142, 68, 173, 1)'
            colorNotSelected = 'rgba(187, 143, 206, 1)'
            colorMouse = '#D2B4DE'
            

        } else
        if (anotade) {
            colorSelected = '#EC7063';
            colorNotSelected = '#52BE80';
            colorMouse = '#7DCEA0';

        }  else if ( not ) {

            /*colorSelected = 'rgba(231, 76, 60)'
            colorNotSelected = 'rgba(241, 148, 138)'
            colorMouse = '#F5B7B1'*/
            colorSelected = 'rgba(142, 68, 173, 1)'
            colorNotSelected = 'rgba(187, 143, 206, 1)'
            colorMouse = '#D2B4DE'

        } else {

            colorSelected = 'rgba(89, 154, 242, 1)'
            colorNotSelected = 'rgba(162, 198, 248, 1)'
            colorMouse = '#dbedff'

        }

        return [colorSelected, colorNotSelected, colorMouse]
    }

    const modSchedule = () => {
        axios.post(`${api}/horarios/modificar`, {'tutore': tutore, 'schedule': schedule }, {'tutore': tutore, 'schedule': schedule})
        .then( (response) => {
            reloadSchedule();
        })
        .catch( (err) => {
            console.log(err)
        })
    };

    const boton = () => {
        if (tutore["rol"]) {
            if (tutore["rol"].includes("pfg") || tutore["rol"].includes("supertutore")) {
                return  <Button type="primary"
                size="large"
                // htmlType="submit"
                style={{
                    textAlign: "center",
                    marginTop: "5%",
                    borderRadius: "10px",
                    fontSize: "15px",
                    color: "white"
                }}
                onClick={modSchedule}>
                Modificar Horario
             </Button> }
        } else {
            return 
        }
    }

    const colorTutorxs = (tutore) => {
        if (!tutore) {
            return <span></span>
        }
        let rol = tutore['rol'];
        let color = '#E74C3C'
        if (rol === 'coordi') {
            color = '#273746'
        } else if (rol === 'jefx') {
            color = 'rgba(46, 134, 193, 1)'
        }
        // console.log(tutore)
        return <span className={"ant-btn-primary tutore"} key={tutore['nombre']} style={{backgroundColor: color, color: 'white', borderRadius: '0.3rem', borderColor: 'transparent', margin: '0.1rem', fontSize: '0.8rem', paddingTop: '0.2rem', paddingBottom: '0.26rem', paddingLeft: '0.3rem', paddingRight: '0.3rem',  verticalAlign: 'center'}}>{tutore['nombre']}</span>
    
            
            //for (let i in lista)

            
        //)</div>}
    }

    const formatTutores = (time) => {
        let lista = [];
        for(let i in horarios){
            if(Date.parse(new Date(horarios[i]['date'])) === Date.parse(time)){
                lista = horarios[i]['nombres'];
            }
        }
        // let result = '';
        let listaTutorxs = []
        for (let i in lista){

            listaTutorxs.push(colorTutorxs(lista[i]))

            // result += `${colorTutorxs(lista[i])}`;
        }
        // console.log(listaTutorxs)

        return   listaTutorxs 
    }

    const renderCustomDateCell = (time, selected, innerRef) => { 
        //console.log(innerRef
        // console.log(selected)
        
        let [colorSelected, colorNotSelected, colorMouse] = colors(time)

        /*
        if (time === Date.parse(new Date("2021-09-05 6:00:00"))) {
            console.log("HORA AAAAAAAAAAAAAA");
            console.log(colorSelected)
        }
        if (time === Date.parse(new Date("2021-09-05 7:00:00"))) {
            console.log("HORA AAAAAAAAAAAAAA");
            console.log(colorSelected)
        } */

        return (
        <div style={{ textAlign: 'center', backgroundColor: selected ? colorSelected : colorNotSelected}} 
            ref={innerRef} onMouseOver={(c) => {
                c.target.style.backgroundColor = colorMouse;
                setSelected(formatTutores(time));
            }}
            onMouseLeave={(c) => {c.target.style.backgroundColor = selected ? colorSelected : colorNotSelected}}>
            {check_espacios(time)}
        </div>
    ) }

    // const validateFields = (rule, value, callback) => {
    //     const nombre = form.getFieldValue('nombre')
    //     if (nombre === '') {
    //     callback('Pon tu nombre plis');
    //     }

    //     let obj = {
    //     schedule: form.getFieldValue('schedule'),
    //     nombre: form.getFieldValue('nombre'),
    //     };
    //     console.log(obj);
    //     // let url = "https://rafa-api.herokuapp.com/people/login";
    //     // axios
    //     //   .post(url, obj)
    //     //   .then((response) => {
    //     //     console.log(response);
    //     //     callback();
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log(err);
    //     //     if (err.response) {
    //     //       callback(err.response.data.error);
    //     //     } else {
    //     //       callback('Ocurrió un error.');
    //     //     }
    
    //     //   });
    // };
    // const onFinish = (values) => {
    //     return;
    // };

    const sendSchedule = () => {
        // const obj = {schedule: schedule, nombre: nombre}
        // console.log("AAA", schedule)
        axios.post(`${api}/horarios/reservar`, {'tutore': tutore, 'schedule': schedule }, {'tutore': tutore, 'schedule': schedule})
        .then( (response) => {
            reloadSchedule();
        })
    }

    const sendRequest = () => {
        const obj = {schedule: schedule, nombre: nombre}
        
        axios.put(`${api}/tutore/change-name`, {"nombre": nombre, "tutore": tutore, "schedule": schedule}, {"nombre": nombre, "tutore": tutore, "schedule": schedule})
        .then( (response) => {
            // console.log(response)
            setNombreNew(response["data"]["name"]);
            // console.log(schedule)
            // setNombreNew(response["data"]["name"])
            
        })
        
        reloadSchedule();
        
    }

    const GoogleSign = () => {

        if (!tutore || !tutore["email"] || !tutore["apodo"]) {
            return <GoogleLogin
            clientId={googleKey}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
            } else {
            
            return <GoogleLogout
            clientId={googleKey}
            buttonText="Logout"
            onLogoutSuccess={responseGoogle}
            >
            </GoogleLogout>
            }
    }

    function sleep(s) {
        return new Promise(resolve => setTimeout(resolve, s))
    }

    if (!firstLoading) {
        reloadSchedule();
    sleep(1380)
    .then( () => {
        
        setFirstLoading(true);
        setIsLoading(false);
    })
    }

    // console.log(horarios)

    return (

     <LoadingScreen
    loading={isLoading}
    bgColor='#ff5757'
    spinnerColor='#9ee5f8'
    textColor='white'
    logoSrc={Logo}
    text='Buscando las llaves de la sala...'
  > 
        
        <div>
            
    
        <h1>Salita Tutores 🥰</h1>

        


        <Card style={{alignItems: 'center'}}>
        
            {/* <Form
              name="basic"
              onFinish={onFinish}
              form={form}
              style={{ marginTop: "10px" }}
            > */}
                <Col xs={24} sm={30} md={36} lg={44} xl={50}>
                    {/* <Form.Item
                        name="schedule"
                        values="schedule"
                        // dependencies={["contrasena"]}
                        validateTrigger="onBlur"
                        rules={[
                        {
                            required: true,
                            message: "Por favor pon algun horario",
                        },
                        {
                            validator: validateFields,
                        }
                        ]}
                    > */}
                        <ScheduleSelector timeFormat='h' startDate={week}  numDays={5} minTime={1} maxTime={8} 
                                        selection={schedule.schedule} onChange={handleChange}
                                        renderDateCell={renderCustomDateCell}  dateFormat='DD/MM'
                        /> 
                    {/* </Form.Item> */}
                    {/* <Form.Item
                        name="nombre"
                        values="nombre"
                        // dependencies={["contrasena"]}
                        validateTrigger="onBlur"
                        rules={[
                        {
                            required: true,
                            message: "Pon tu nombreeee",
                        },
                        {
                            validator: validateFields,
                        }
                        ]}
                    > */}
                    <p style={{marginTop:'2%'}}>Tutores en la casilla: {selected}</p>
                    {/* </Form.Item> */}
                    
                    <Button
                            type="primary"
                            size="large"
                            // htmlType="submit"
                            style={{
                                textAlign: "center",
                                marginTop: "5%",
                                borderRadius: "10px",
                                fontSize: "15px",
                                color: "white"
                            }}
                            onClick={reloadSchedule}
                        >
                            Recargar
                    </Button>
                    
                    <Button
                            type="primary"
                            size="large"
                            // htmlType="submit"
                            style={{
                                textAlign: "center",
                                marginTop: "5%",
                                borderRadius: "10px",
                                fontSize: "15px",
                                color: "white"
                            }}
                            onClick={sendSchedule}
                        >
                            Enviar
                    </Button>

                    {boton()}
                    <Input placeholder='Cambiar tu nombre' value={nombre}  style={{ marginTop: '1%' }} onChange={(d) => setNombre(d.target.value)}/>
                    {/* </Form.Item> */}
                    <Button
                            type="primary"
                            size="large"
                            // htmlType="submit"
                            style={{
                                textAlign: "center",
                                marginTop: "5%",
                                borderRadius: "10px",
                                fontSize: "15px",
                                color: "white"
                            }}
                            onClick={sendRequest}
                        >
                            Cambiar mi nombre
                    </Button>
                </Col>
            {/* </Form> */}
        </Card>
        
        {/*
        <img src={googleImage}></img>
        */}
        <h1>{email}</h1>
        <h1>{name}</h1>
        <h1>{nombreNew}</h1>

        {GoogleSign()}


        <p style={{textAlign: "center", marginTop: "4%"}}>
          Made with {<HeartFilled />} by PFGang
        </p>
        </div>
    </LoadingScreen>
    )
}