import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Card, Input, Modal, Space, Anchor } from 'antd';
import { HeartFilled, ReloadOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import ScheduleSelector from 'react-schedule-selector';
import axios from "axios";
import { Header } from 'antd/lib/layout/layout';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import  LoadingScreen  from 'react-loading-screen';
import Logo from '../logo.gif';
import { Switch } from 'antd'
import AppHeader from './header';
import logo from '../img/logo.svg'


let api = "https://sala-tutorxs.herokuapp.com"// "https://sala-tutorxs.herokuapp.com"
const googleKey = process.env.REACT_APP_GOOGLE;
// api = "http://localhost:5000"

const { Link } = Anchor;
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
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() + 1 )
    const [schedule, setSchedule] = useState({});
    const [nombre, setNombre] = useState('');
    const [selected, setSelected] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [week, setWeek] = useState(date)
    const [mood, setMood] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [weekDays, setWeekDays] = useState(5)
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
        valor = new Date(`${response["data"]["start"]} 13:00:00`);
        
        if (mood === true) {
            valor.setDate(valor.getDate() + 7);
        }

        setWeek(valor);
        console.log(valor, week)
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
        setMood(false);

        reloadSchedule();
        
        //console.log(week)
        // console.log(response);
        //console.log("AAA", response);
        
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
            setNombreNew("")
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

            colorSelected = '#e8ebed'
            colorNotSelected = '#e8ebed'
            colorMouse = '#e8ebed'
            
            if (tutore["rol"].includes("pfg") || tutore["rol"].includes("supertutore")) {
                colorSelected = '#657786';
                colorMouse = '#8ea0ab';
            }

        } else
        if (anotade) {
            colorSelected = '#EC7063';
            colorNotSelected = '#52BE80';
            colorMouse = '#7DCEA0';

        }  else if ( not || time.getDay() === 6 || time.getDay() === 0) {

            /*colorSelected = 'rgba(231, 76, 60)'
            colorNotSelected = 'rgba(241, 148, 138)'
            colorMouse = '#F5B7B1'*/
            colorSelected = '#e8ebed'
            colorNotSelected = '#e8ebed'
            colorMouse = '#b5c0c7'

            if (tutore["rol"].includes("pfg") || tutore["rol"].includes("supertutore")) {
                colorSelected = '#657786';
                colorMouse = '#8ea0ab';
            }

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

    const changeMood = () => {
    
        if (tutore["rol"].includes("pfg") || tutore["rol"].includes("supertutore")) {
            
            if (!mood) {
                setWeekDays(5)
                week.setDate(week.getDate() + 7);
            } else {
                setWeekDays(5)
                week.setDate(week.getDate() - 7);
            }

            setMood(!mood);
        } else {
            setMood(false);
            setWeekDays(5)
        }
    }

    const changeName = () => {
        console.log(tutore["email"])
        let esClase = "";
        if (!tutore["email"]) { 
            return <span style={{width: "100%"}}></span>
        }

        return ( 
            <Modal 
            title="Cambia tu nombre!" 
            visible={isModalVisible} 
            onOk={sendRequest} 
            onCancel={handleCancel}
            okText="Cambiar"
            >
                <Input placeholder='Cambiar tu nombre' value={nombre}  style={{ marginTop: '1%' }} onChange={(d) => setNombre(d.target.value)}/>
            </Modal>
        )
    }

    const boton = () => {
        if (tutore["rol"]) {
            if (tutore["rol"].includes("pfg") || tutore["rol"].includes("supertutore")) {
                return ( <Button type="primary"
                // size="small"
                // htmlType="submit"
                shape="round"
                style={{
                    textAlign: "center",
                    color: "white"
                }}
                onClick={modSchedule}>
                Modificar Horario
             </Button> ) }
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
        return <span className={"ant-btn-primary-3 tutore"} key={tutore['nombre']} style={{backgroundColor: color, color: 'white', borderRadius: '0.3rem', borderColor: 'transparent', margin: '0.1rem', fontSize: '0.8rem', paddingTop: '0.2rem', paddingBottom: '0.26rem', paddingLeft: '0.3rem', paddingRight: '0.3rem',  verticalAlign: 'center'}}>{tutore['nombre']}</span>
    
            
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

        let [colorSelected, colorNotSelected, colorMouse] = colors(time)

        return (
        <div 
        style={{ 
            textAlign: 'center', 
            backgroundColor: selected ? colorSelected : colorNotSelected,
            borderRadius: '20px',
            height: '30px',
            padding: '3px'
        }} 
            ref={innerRef} onMouseOver={(c) => {
                c.target.style.backgroundColor = colorMouse;
                setSelected(formatTutores(time));
            }}
            onMouseLeave={(c) => {c.target.style.backgroundColor = selected ? colorSelected : colorNotSelected}}>
            {check_espacios(time)}
        </div>
    ) }

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
            reloadSchedule();
        })
        setIsModalVisible(false);
        
    }

    const renderTimeLabel = (time) => {
        let traductor = {   1: "M1",
                        2: "M2",
                        3: "M3",
                        4: "AL",
                        5: "M4",
                        6: "M5",
                        7: "M6"}

        let traductorTime = {   1: "08:30",
                        2: "10:00",
                        3: "11:30",
                        4: "13:00",
                        5: "14:00",
                        6: "15:30",
                        7: "17:00"}
        return <span className="timeFont">{traductorTime[time.getHours()]}</span>
    }

    const renderDateLabel = (date) => {
        let traductor = {   1: "L",
                        2: "M",
                        3: "W",
                        4: "J",
                        5: "V",
                        6: "S",
                        0: "D"}
        return <span className="dateFont">{traductor[date.getDay()]} {date.getDate()}</span>
    }

    const GoogleSign = () => {

        if (!tutore || !tutore["email"] || !tutore["apodo"]) {
            return <GoogleLogin
            clientId={googleKey}
            buttonText="Iniciar Sesión ❤"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
        } else {
            
            return <GoogleLogout
            clientId={googleKey}
            buttonText="Cerrar Sesión"
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
    sleep(2380)
    .then( () => {
        
        setFirstLoading(true);
        setIsLoading(false);
    })
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // console.log(horarios)

    return (
    
    <LoadingScreen

        loading={isLoading}
        bgColor='#ff5757' // '#cc0000'
        spinnerColor='#9ee5f8'
        textColor='white'
        logoSrc={Logo}
        text='Buscando las llaves de la sala...'
    > 
        <div className="principal">
            <div className="header">
                <Row align="middle" justify="space-between">
                <img src={logo} style={{ width: 50 }} alt="" />
                <Anchor className="anchor" targetOffset="70">
                    <Button type="link" onClick={showModal}>
                        <Link title={nombreNew}/>
                    </Button>
                </Anchor>
                </Row>
            </div>

            <div id="home" className="wave-container">
                <Row justify="center" style={{marginLeft: "15px", marginRight: "15px"}}>
                <Space size="small" direction="vertical">
                    <h1 className="title">Sala de Tutores</h1>
                    <p className="description">{<HeartFilled/>} Reserva tus módulos en la salita {<HeartFilled/>}</p>
                    <br/>
                    {GoogleSign()}
                </Space>
                </Row>
                {/*<img src={imagen} className="imgHeader" alt="" />*/}

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" fill-opacity="1" d="M0,32L60,37.3C120,43,240,53,360,85.3C480,117,600,171,720,202.7C840,235,960,245,1080,224C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>

            {(tutore.email !== "") &&

            
            <div id="reservar">
                <Row justify="center">
                    <Card style={{alignItems: 'center'}} bordered={false}>
                    
                        <Col xs={24} sm={30} md={36} lg={44} xl={50}>
                            <ScheduleSelector 
                                timeFormat='h' 
                                startDate={week}  
                                numDays={weekDays} 
                                minTime={1} 
                                maxTime={8} 
                                selection={schedule.schedule} 
                                onChange={handleChange}
                                renderDateCell={renderCustomDateCell}  
                                renderTimeLabel={renderTimeLabel}
                                renderDateLabel={renderDateLabel}
                                dateFormat='ddd DD'
                            /> 

                            <br/>

                            <Space>
                                <Button
                                    type="primary"
                                    
                                    // htmlType="submit"
                                    shape="round"
                                    style={{
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                    onClick={reloadSchedule}
                                >
                                        {<ReloadOutlined />}
                                </Button>
                                
                                <Button
                                    type="primary"
                                    
                                    // htmlType="submit"
                                    shape="round"
                                    style={{
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                    onClick={sendSchedule}
                                >
                                        Enviar
                                </Button>

                                {boton()}
                                
                            </Space>
                            
                            <br/>
                            <br/>
                            
                            <Card
                                title="Tutores en el módulo" 
                                bordered={false}
                                style={{ 
                                    backgroundColor: "#F5F8FA",
                                    height: "130px"
                                }}
                            >
                                <Row align="middle" justify="center" style={{height: '70px'}}>
                                    {selected}
                                </Row>
                            </Card>
                        </Col>
                        <br/>
                        <Space align="center" direction="vertical" size="small">
                            {(tutore["rol"].includes("pfg") || tutore["rol"].includes("supertutore")) &&
                                <Switch style={{position: "relative"}} onChange={changeMood}> </Switch> // {mood}
                            }
                        </Space> 
                    </Card>
                </Row>
                
            </div>
            }

            {changeName()}
        </div>
        <p style={{textAlign: "center", marginTop: "4%"}}>
            Made with {<HeartFilled />} by PFGang
        </p>
        
    </LoadingScreen>
    )
}