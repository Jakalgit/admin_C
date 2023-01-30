import React, {useEffect, useRef, useState} from 'react';
import CreateItemCss from "../../css/admin/CreateItem.module.css";
import style_css from "../../css/admin/CreateItemTabs.module.css"
import XLSX from 'xlsx/xlsx.mini'
import CreateItem from "./CreateItem";
import {getAllTags} from "../../http/API/tagAPI";
import {Spinner} from "react-bootstrap";
import general from "../../css/General.module.css";

const CreateItemTabs = () => {

    const [loading, setLoading] = useState(true)

    const [tags, setTags] = useState([])
    const [tabs, setTabs] = useState([])
    const [dataIn, setDataIn] = useState([])
    const [currentData, setCurrentData] = useState({
        id: 0,
        name: '',
        price: '',
        stock: true,
        with_discount: false,
        visible: true,
        is_new: false,
        width: '',
        length: '',
        height: '',
        weight: '',
        old_price: '',
        discount: '',
        article: "",
        color: {
            img1: null,
            img2: null,
            img3: null,
            img4: null,
        },
        tags: [],
        info: [],
    })

    const fileRef = useRef(null)

    useEffect(() => {
        const _tabs = []
        dataIn.forEach(data => {
            _tabs.push({name: data.name, id: data.id})
        })
        setTabs(_tabs)
    }, [dataIn])

    useEffect(() => {
        getAllTags().then(data => {
            setTags(data)
            setLoading(false)
        })
    }, [])

    const selectTable = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                const data = e.target.result
                const readData = XLSX.read(data, {type: 'binary'})
                const wsName = readData.SheetNames[0]
                const ws = readData.Sheets[wsName]

                const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1})
                let _parse = []
                for (let i = 2; i < dataParse.length; i++) {
                    if (dataParse[i].length !== 0) {
                        const line = dataParse[i]
                        let _object = {
                            id: Date.now() + i,
                            name: line[0],
                            price: line[1],
                            stock: line[2] === 'Да',
                            with_discount: line[3] === 'Да',
                            visible: line[4] === 'Да',
                            is_new: line[5] === 'Да',
                            width: line[6],
                            length: line[7],
                            height: line[8],
                            weight: line[9],
                            old_price: line[10],
                            discount: line[11],
                            article: line[12],
                            color: {
                                img1: null,
                                img2: null,
                                img3: null,
                                img4: null,
                            },
                            tags: [],
                            info: [],
                        }
                        // С 13 элемента в таблице начинаются теги
                        for (let i = 13; i < line.length; i++) {
                            if (tags.filter(el => el.name === line[i]).length > 0) {
                                _object.tags.push({name:line[i]})
                            }
                        }
                        _parse.push(_object)
                    }
                }
                setDataIn(_parse)
                setCurrentData(_parse[0])
            }
            reader.readAsBinaryString(file)
        }
    }

    const updateData = (value) => {
        setDataIn(value)
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div>
            {tabs.length > 1 &&
                <div className={style_css.tabs}>
                    <div className={style_css.line}>
                        {tabs.map(tab => {
                            if (tab.id === currentData.id) {
                                return (
                                    <div className={style_css.tab + ' ' + style_css.tab_check} onClick={() => {
                                        setCurrentData(dataIn.find(el => el.id === tab.id))
                                    }}>
                                        <h1 className={style_css.name_tab}>{tab.name}</h1>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={style_css.tab} onClick={() => {
                                        setCurrentData(dataIn.find(el => el.id === tab.id))
                                    }}>
                                        <h1 className={style_css.name_tab}>{tab.name}</h1>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            }
            <div className="container">
                <div className="row">
                    <label className={CreateItemCss.input_file}>
                        <input
                            ref={fileRef}
                            onChange={e => {selectTable(e)}}
                            type="file"
                            accept="xlsx, xls"
                            multiple={false}
                            className={CreateItemCss.file}
                        />
                        <h2 className={CreateItemCss.file_text}>Загрузить файл xlsx</h2>
                    </label>
                </div>
            </div>
            <CreateItem currentData={currentData} updateData={(value) => updateData(value)} dataIn={dataIn} tags={tags} />
        </div>
    );
};

export default CreateItemTabs;