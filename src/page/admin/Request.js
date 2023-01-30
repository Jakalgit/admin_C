import React, {useEffect, useState} from 'react';
import style_css from "../../css/admin/Request.module.css"
import {changeChecked, deleteRequest, getAllRequests} from "../../http/API/requestAPI";
import {Spinner} from "react-bootstrap";
import general from "../../css/General.module.css";

const Request = () => {

    const [requests, setRequests] = useState([])

    const [loading, setLoading] = useState(true)

    const getAllReq = () => {
        getAllRequests().then(data => {
            setRequests(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllReq()
    })

    const checkRequest = (id) => {
        changeChecked(true, id).then(() => {
            getAllReq()
        })
    }

    const delRequest = (id) => {
        deleteRequest(id).then(() => {
            getAllReq()
        })
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div className={style_css.block}>
            <div className="container">
                <div className="row">
                    <div className={style_css.list}>
                        {requests.reverse().map(request => {
                            if (request.checked) {
                                return (
                                    <div className={style_css.item_flex}>
                                        <div className={style_css.item + ' ' + style_css.checked}>
                                            <h1 className={style_css.text}>{request.name}</h1>
                                            <h1 className={style_css.text}>{request.phone}</h1>
                                            <div className={style_css.images}>
                                                <img
                                                    onClick={() => delRequest(request.id)}
                                                    src={require("../../img/x_black.svg")}
                                                    alt=""
                                                    className={style_css.image}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={style_css.item_flex}>
                                        <div className={style_css.item + ' ' + style_css.not_checked}>
                                            <h1 className={style_css.text}>{request.name}</h1>
                                            <h1 className={style_css.text}>{request.phone}</h1>
                                            <div className={style_css.images}>
                                                <img
                                                    onClick={() => checkRequest(request.id)}
                                                    src={require("../../img/check.svg")}
                                                    alt=""
                                                    className={style_css.image}
                                                />
                                                <img
                                                    onClick={() => delRequest(request.id)}
                                                    src={require("../../img/x_black.svg")}
                                                    alt=""
                                                    className={style_css.image}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request;