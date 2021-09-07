import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Card, Input, Divider, Space } from 'antd';
import { HeartFilled, ReloadOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import ScheduleSelector from 'react-schedule-selector';
import axios from "axios";
import { Header } from 'antd/lib/layout/layout';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import  LoadingScreen  from 'react-loading-screen';
import Logo from '../logo.gif';



let api = "https://sala-tutorxs.herokuapp.com"
const googleKey = process.env.REACT_APP_GOOGLE;
api = "http://localhost:5000"


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
function loadSchedule () {    axios
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
            let tiempo = new Date() + s;
            while (new Date() < tiempo) {

            }
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
        
        if (response) {
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

        if (!tutore || !tutore["email"]) {
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

    // console.log(horarios)

    return (
    
     <LoadingScreen
    loading={!isLoading}
    bgColor='#cc0000'
    spinnerColor='#9ee5f8'
    textColor='white'
    logoSrc={Logo}
    text='Buscando las llaves de la sala...'
  > 
        <div id="home" className="wave-container">
            <Row justify="center" style={{marginLeft: "15px", marginRight: "15px"}}>
            <Space size="small" direction="vertical">
                <h1 className="title">Sala de Tutores</h1>
                <p className="description">Reserva tus módulos en la sala de Tutores!</p>
                {GoogleSign()}
            </Space>
            </Row>
            {/*<img src={imagen} className="imgHeader" alt="" />*/}

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#F5A5A5" fill-opacity="0.8" d="M0,256L26.7,256C53.3,256,107,256,160,218.7C213.3,181,267,107,320,112C373.3,117,427,203,480,208C533.3,213,587,139,640,138.7C693.3,139,747,213,800,218.7C853.3,224,907,160,960,122.7C1013.3,85,1067,75,1120,80C1173.3,85,1227,107,1280,138.7C1333.3,171,1387,213,1413,234.7L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>

            <path fill="#fff" fill-opacity="1" d="M0,64L30,58.7C60,53,120,43,180,80C240,117,300,203,360,234.7C420,267,480,245,540,224C600,203,660,181,720,154.7C780,128,840,96,900,106.7C960,117,1020,171,1080,197.3C1140,224,1200,224,1260,240C1320,256,1380,288,1410,304L1440,320L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
            </svg>

        </div>

        <div id="reservar">
            <h1></h1>
            <Space align="center" direction="vertical" size="small">
                {/*<p>{<MailOutlined />} {email}</p>*/}
                {(nombreNew === '') && 
                    <p className="username">{<UserOutlined />} {name}</p>
                }
                {(nombreNew !== '') && 
                    <p className="username">{<UserOutlined />} {nombreNew}</p>
                }
            </Space> 
            <Row justify="center">
                <Card style={{alignItems: 'center', maxWidth: 600}} bordered={false}>
                
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
                            <Space>
                                <Button
                                        type="primary"
                                        
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
                                        {<ReloadOutlined />}
                                </Button>
                                
                                <Button
                                        type="primary"
                                        
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
                            </Space>
                            {boton()}
                            
                            <Input placeholder='Cambiar tu nombre' value={nombre}  style={{ marginTop: '1%' }} onChange={(d) => setNombre(d.target.value)}/>
                            {/* </Form.Item> */}
                            <Button
                                    type="primary"
                                    
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
            </Row>
            {/*
            <img src={googleImage}></img>
            */}
            


            <p style={{textAlign: "center", marginTop: "4%"}}>
            Made with {<HeartFilled />} by PFGang
            </p>
        </div>
    </LoadingScreen>
    )
}