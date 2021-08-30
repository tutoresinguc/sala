import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Card, Input, Form } from 'antd';
import ScheduleSelector from 'react-schedule-selector';
import axios from "axios";
import { Header } from 'antd/lib/layout/layout';


const style = { background: '#0092ff', padding: '8px 0' };
// GET de array u obj, buscar fecha y obtener personas anotadas
/*const example_get = [
    {
        'date': "2021-08-30 1:00:00",
        'nombres': ['tesurot'],
        'espacios': 1
    }
]; */




//let  useEffect();

// console.log(example_get)



let example_get = []

let url = "http://localhost:5000/week" //"https://sala-tutorxs.herokuapp.com/week";
    axios
        .get(url, {}, {headers: {"Access-Control-Allow-Origin": "*"}})
                                    
        .then((response) => {

        example_get = response["data"];

        })
        .catch((err) => {
        console.log(err);
        if (err.response) {
        } else {
        }

        });


export default function HorariosSala() {

    const [schedule, setSchedule] = useState({});
    const [nombre, setNombre] = useState('Tesurot');
    const [selected, setSelected] = useState('');
    // const [form] = Form.useForm();

    
    const handleChange = (newSchedule) => {
        setSchedule({ schedule: newSchedule });
    }

    const check_espacios = (time) => {
        //console.log(example_get[0]['date']);
        //console.log(time);
        // console.log(example_get)
        for(let i in example_get){
            if(Date.parse(new Date(example_get[i]['date'])) === Date.parse(time)){
                return `(${example_get[i]['espacios']}/4)`;
            }
        }
        return '(0/4)'
    }

    const formatTutores = (time) => {
        let lista = [];
        for(let i in example_get){
            if(Date.parse(new Date(example_get[i]['date'])) === Date.parse(time)){
                lista = example_get[i]['nombres'];
            }
        }
        let result = '';
        for (let i in lista){
            result += lista[i];
        }
        return result;
    }

    const renderCustomDateCell = (time, selected, innerRef) => (
        <div style={{ textAlign: 'center', backgroundColor: selected ? 'rgba(89, 154, 242, 1)' : 'rgba(162, 198, 248, 1)'}} 
            ref={innerRef} onMouseOver={(c) => {
                c.target.style.backgroundColor = '#dbedff';
                setSelected(formatTutores(time));
            }}
            onMouseLeave={(c) => {c.target.style.backgroundColor = selected ? 'rgba(89, 154, 242, 1)' : 'rgba(162, 198, 248, 1)'}}>
            {check_espacios(time)}
        </div>
    )

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

    const sendRequest = () => {
        const obj = {schedule: schedule, nombre: nombre}
        console.log(obj);
        
    }

    return (
        <div>
        <h1>Salita Tutores 🥰</h1>
        <Card style={{ width: 600 }}>
            {/* <Form
              name="basic"
              onFinish={onFinish}
              form={form}
              style={{ marginTop: "10px" }}
            > */}
                <Col>
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
                        <ScheduleSelector timeFormat='h' minTime={1} maxTime={8} 
                                        selection={schedule.schedule} onChange={handleChange}
                                        renderDateCell={renderCustomDateCell}  dateFormat='D/M'
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
                    <Input placeholder='Nombre Tutor/a' style={{ marginTop: '1%' }} onChange={(d) => setNombre(d.target.value)}/>
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
                            Enviar
                    </Button>
                </Col>
            {/* </Form> */}
        </Card>
        </div>
    )
}