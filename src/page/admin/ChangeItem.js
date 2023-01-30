import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    changeAvailability,
    changeDiscount,
    changeDiscountFlag,
    changeHeight,
    changeInfo,
    changeLength,
    changeName,
    changePrice,
    changeVisibility,
    changeWeight,
    changeWidth,
    fetchOneItem,
    fetchAllInfo,
    changeNew,
    changeArticle, createItemInfo, deleteInfo
} from "../../http/API/itemAPI"
import {
    changeImg_1,
    changeImg_2,
    changeImg_3,
    changeImg_4,
    fetchColor
} from "../../http/API/colorAPI"
import {Spinner} from "react-bootstrap";
import Alert from "../../components/Alert";
import ChangeItemCss from "../../css/admin/ChangeItem.module.css"
import Footer from "../../components/Footer";
import LoadImage from "../../components/LoadImage";
import style_css from "../../css/admin/CreateItem.module.css";
import {changeTagsAddiction, getAddictionById, getAllTags, getOneTag} from "../../http/API/tagAPI";
import general from "../../css/General.module.css";

const ChangeItem = () => {

    const {id} = useParams()

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [loading, setLoading] = useState(true)

    const [tags, setTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])
    const [currentTags, setCurrentTags] = useState([])

    const [findTagName, setFindTagName] = useState('')

    const [name,setName] = useState('')
    const [price, setPrice] = useState('')
    const [availability, setAvailability] = useState(true)
    const [visibility, setVisibility] = useState(false)
    const [article, setArticle] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [discountFlag, setDiscountFlag] = useState(false)
    const [discount, setDiscount] = useState('')
    const [oldPrice, setOldPrice] = useState('')
    const [info, setInfo] = useState([])
    const [newItem, setNewItem] = useState(false)

    const [color, setColor] = useState(null)

    useEffect(() => {
        fetchOneItem(id).then(data => {
            setName(data.name)
            setPrice(data.price)
            setArticle(data.article)
            setLength(data.length)
            setWidth(data.width)
            setHeight(data.height)
            setWeight(data.weight)
            setDiscountFlag(data.discount_flag)
            setDiscount(data.discount)
            setOldPrice(data.old_price)
            setAvailability(data.availability)
            setVisibility(data.visibility)
            setNewItem(data.new_item)
            fetchAllInfo(data.id).then(data => {
                const _info = []
                data.rows.forEach(i => {
                    _info.push({
                        id: i.id,
                        info: i.info,
                        base: true,
                    })
                })
                setInfo(_info)
                fetchColor(id).then(data => {
                    setColor({
                        id: data.id,
                        itemId: data.itemId,
                        img1: data.img1,
                        img2: data.img2,
                        img3: data.img3,
                        img4: data.img4,
                    })
                    getAllTags().then(data => {
                        setTags(data)
                        getAddictionById(id).then(data => {
                            if (data !== "Error") {
                                data.forEach(tag_to_item => {
                                    getOneTag(tag_to_item.itemTagId).then(data => {
                                        setCurrentTags(prevState => [...prevState, data])
                                    })
                                })
                                setLoading(false)
                            }
                        })
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    useEffect(() => {
        if (findTagName) {
            setFilteredTags(Object.values(tags).filter(tag => {
                return tag.name.toLowerCase().includes(findTagName.toLowerCase())
            }))
        } else {
            setFilteredTags(tags)
        }
    }, [tags, findTagName])

    const updateColors = () => {
        fetchColor(id).then(data => {
            setColor(data)
        })
    }

    const clickChangeName = () => {
        if (name) {
            changeName(name, id).then(() => {
                setStart(true)
                setMessage('Название изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangePrice = () => {
        if (price) {
            changePrice(price, id).then(() => {
                setStart(true)
                setMessage('Цена изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const changeImage_1 = (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('img1', file)
            changeImg_1(formData).then(data => {
                if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                    setMessage('Сохранено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка изображения')
                    setStyle('danger')
                }
                updateColors()
                setStart(true)
            })
        }
    }

    const changeImage_2 = (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('img2', file)
            changeImg_2(formData).then(data => {
                if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                    setMessage('Сохранено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка изображения')
                    setStyle('danger')
                }
                updateColors()
                setStart(true)
            })
        }
    }

    const changeImage_3 = (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('img3', file)
            changeImg_3(formData).then(data => {
                if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                    setMessage('Сохранено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка изображения')
                    setStyle('danger')
                }
                updateColors()
                setStart(true)
            })
        }
    }

    const changeImage_4 = (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('img4', file)
            changeImg_4(formData).then(data => {
                if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                    setMessage('Сохранено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка изображения')
                    setStyle('danger')
                }
                updateColors()
                setStart(true)
            })
        }
    }

    const clickChangeLength = () => {
        if (length) {
            changeLength(length, id).then(() => {
                setStart(true)
                setMessage('Длина изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeWidth = () => {
        if (width) {
            changeWidth(width, id).then(() => {
                setStart(true)
                setMessage('Ширина изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeHeight = () => {
        if (height) {
            changeHeight(height, id).then(() => {
                setStart(true)
                setMessage('Высота изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeWeight = () => {
        if (weight) {
            changeWeight(weight, id).then(() => {
                setStart(true)
                setMessage('Вес изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeDiscount = () => {
        if (discountFlag) {
            if (discount && oldPrice) {
                changeDiscount(id, discount, discountFlag, oldPrice).then(data => {
                    if (data !== "Ошибка") {
                        setMessage('Сохранено')
                        setStyle('primary')
                    } else {
                        setMessage('Ошибка')
                        setStyle('danger')
                    }
                    setStart(true)
                })
            } else {
                setMessage('Ошибка')
                setStyle('danger')
                setStart(true)
            }
        } else {
            changeDiscountFlag(id, discountFlag).then(data => {
                if (data !== "Ошибка") {
                    setMessage('Сохранено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка')
                    setStyle('danger')
                }
                setStart(true)
            })
        }
    }

    const clickChangeAvailability = () => {
        changeAvailability(availability, id).then(() => {
            setStart(true)
            setMessage('Наличие изменено')
            setStyle('primary')
        })
    }

    const clickChangeVisibility = () => {
        changeVisibility(visibility, id).then(() => {
            setStart(true)
            setMessage('Видимость изменена')
            setStyle('primary')
        })
    }

    const clickChangeNew = () => {
        changeNew(newItem, id).then(() => {
            setStart(true)
            setMessage('Новинки измененены')
            setStyle('primary')
        })
    }

    const clickChangeArticle = () => {
        changeArticle(id, article).then(data => {
            if (data !== 'Error' && data !== 'Ошибка') {
                setMessage('Артикуль измененён')
                setStyle('primary')
            } else {
                setMessage('Ошибка')
                setStyle('danger')
            }
            setStart(true)
        })
    }

    const clickChangeInfo = (inf, itemId) => {
        if (inf.info) {
            if (inf.base) {
                changeInfo(inf.info, id).then(() => {
                    setStart(true)
                    setMessage('Информация изменена')
                    setStyle('primary')
                })
            } else {
                createItemInfo(inf.info, itemId).then(() => {
                    setStart(true)
                    setMessage('Информация изменена')
                    setStyle('primary')
                })
            }
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickDeleteInfo = (inf) => {
        if (inf.base) {
            deleteInfo(inf.id).then(data => {
                if (data !== 'Error' || data !== 'Ошибка') {
                    setMessage('Информация удалена')
                    setStyle('primary')
                    setInfo(info.filter(el => el.id !== inf.id ? el : null))
                } else {
                    setMessage('Ошибка')
                    setStyle('danger')
                }
                setStart(true)
            })
        } else {
            setInfo(info.filter(el => el.id !== inf.id ? el : null))
        }
    }

    const clickAddInfo = () => {
        setInfo([...info, {id: Date.now(), info: '', base: false}])
    }

    const addTag = (tag) => {
        if (currentTags.findIndex(el => el.id === tag.id) === -1) {
            setCurrentTags([...currentTags, tag])
        }
    }

    const deleteTag = (tag) => {
        setCurrentTags(currentTags.filter(item => item.name !== tag.name))
    }

    const saveTagAddiction = () => {
        changeTagsAddiction(JSON.stringify(currentTags), id).then(data => {
            if (data !== "Error" && data !== "Ошибка") {
                setStart(true)
                setMessage('Теги сохранены')
                setStyle('primary')
            } else {
                setStart(true)
                setMessage('Ошибка')
                setStyle('danger')
            }
        })
    }

    const updateStart = (value) => {
        setStart(value)
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
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className="container">
                <div className="row">
                    <div className={style_css.tags_block
                        + ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                        <input value={findTagName}
                               onChange={e => setFindTagName(e.target.value)}
                               type="text" className={style_css.find_tags} placeholder="Введите название тега"/>
                        {filteredTags &&
                            <div className={style_css.tags_list}>
                                {filteredTags.map(tag =>
                                    <div onClick={() => addTag(tag)} className={style_css.tag + ' ' + style_css.tag_l}>
                                        <p className={style_css.tag_text}>{tag.name}</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    <div style={{borderStyle: 'none'}} className={style_css.tags_block +
                        ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                        {currentTags.map(tag =>
                            <div onClick={() => deleteTag(tag)} className={style_css.tag + ' ' + style_css.tag_r}>
                                <p className={style_css.tag_text}>{tag.name}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={() => saveTagAddiction()}
                        className={ChangeItemCss.save + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 ' +
                            'col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3, col-8 offset-2'}>
                        Сохранить теги
                    </button>
                </div>
            </div>
            <div className={ChangeItemCss.name_price}>
                <div className="container">
                    <div className="row">
                        <input type="text"
                               value={name}
                               onChange={(e) => {setName(e.target.value)}}
                               className={ChangeItemCss.input + ' col-xxl-8 offset-xxl-0 col-xl-8 offset-xl-0 col-lg-8 offset-lg-0 col-md-8 offset-md-0 col-sm-8 offset-sm-0 col-6 offset-1'}
                               placeholder="Введите название"/>
                        <button onClick={clickChangeName}
                            className={ChangeItemCss.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                            Сохранить
                        </button>
                        <input type="number"
                               value={price}
                               onChange={(e) => {setPrice(e.target.value)}}
                               className={ChangeItemCss.input + ' col-xxl-8 offset-xxl-0 col-xl-8 offset-xl-0 col-lg-8 offset-lg-0 col-md-8 offset-md-0 col-sm-8 offset-sm-0 col-6 offset-1'}
                               placeholder="Введите цену"/>
                        <button onClick={clickChangePrice}
                            className={ChangeItemCss.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.radio_item}>
                <div className="container">
                    <div className="row">
                        <div className='left col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setAvailability(true)} type="radio" className={ChangeItemCss.radio} name="stock" checked={availability}/>
                                <h2 className={ChangeItemCss.line_text}>В наличии</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setAvailability(false)} type="radio" className={ChangeItemCss.radio} name="stock" checked={!availability}/>
                                <h2 className={ChangeItemCss.line_text}>Нет в наличии</h2>
                            </div>
                            <button onClick={clickChangeAvailability}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                        <div className='left col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setNewItem(true)} type="radio" className={ChangeItemCss.radio} name="new" checked={newItem}/>
                                <h2 className={ChangeItemCss.line_text}>Новинка</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setNewItem(false)} type="radio" className={ChangeItemCss.radio} name="new" checked={!newItem}/>
                                <h2 className={ChangeItemCss.line_text}>Не новинка</h2>
                            </div>
                            <button onClick={clickChangeNew}
                                    className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                        <div
                            className='right col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-3'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setVisibility(true)} type="radio" className={ChangeItemCss.radio} name="visibility" checked={visibility}/>
                                <h2 className={ChangeItemCss.line_text}>Видимый</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setVisibility(false)} type="radio" className={ChangeItemCss.radio} name="visibility" checked={!visibility}/>
                                <h2 className={ChangeItemCss.line_text}>Невидимый</h2>
                            </div>
                            <button onClick={clickChangeVisibility}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.images_item}>
                <div className="container">
                    <div className="row">
                        <div style={{marginBottom: '1rem'}}>
                            <input
                                type="text"
                                value={article}
                                onChange={(e) => setArticle(e.target.value)}
                                className={ChangeItemCss.input +
                                    ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-10 offset-1'}
                                placeholder="Артикуль товара"
                            />
                            <button
                                onClick={clickChangeArticle}
                                className={ChangeItemCss.save +
                                    ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-10 offset-1'}>
                                Сохранить
                            </button>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    changeImage_1(e)
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 1</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {color.img1 === null ?
                                    <div/>
                                    :
                                    <LoadImage name={color.img1} className={ChangeItemCss.change_image} />
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    changeImage_2(e)
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 2</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {color.img2 === null ?
                                    <div/>
                                    :
                                    <LoadImage name={color.img2} className={ChangeItemCss.change_image} />
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    changeImage_3(e)
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 3</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {color.img3 === null ?
                                    <div/>
                                    :
                                    <LoadImage name={color.img3} className={ChangeItemCss.change_image} />
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    changeImage_4(e)
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 4</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {color.img4 === null ?
                                    <div/>
                                    :
                                    <LoadImage name={color.img4} className={ChangeItemCss.change_image} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.name_price}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={length}
                                   onChange={(e) => setLength(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Длина(см)'/>
                            <button onClick={clickChangeLength}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={width}
                                   onChange={(e) => setWidth(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Ширина(см)'/>
                            <button onClick={clickChangeWidth}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={height}
                                   onChange={(e) => setHeight(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Высота(см)'/>
                            <button onClick={clickChangeHeight}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={weight}
                                   onChange={(e) => setWeight(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Вес(кг)'/>
                            <button onClick={clickChangeWeight}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.discount}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-0">
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setDiscountFlag(true)}
                                    type="radio" className={ChangeItemCss.radio} name="discount" checked={discountFlag}/>
                                <h2 className={ChangeItemCss.line_text}>Со скидкой</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setDiscountFlag(false)}
                                    type="radio" className={ChangeItemCss.radio} name="discount" checked={!discountFlag}/>
                                <h2 className={ChangeItemCss.line_text}>Без скидки</h2>
                            </div>
                        </div>
                        {discountFlag ?
                            <div className="row col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12" style={{display: "inline-block"}}>
                                <div style={{display: "inline-block"}} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <input type="text"
                                           value={oldPrice}
                                           onChange={(e) => setOldPrice(e.target.value)}
                                           className={ChangeItemCss.input + ' ' + ChangeItemCss.margin + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                           placeholder="Старая цена"/>
                                </div>
                                <div style={{display: "inline-block"}} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <input type="text"
                                           value={discount}
                                           onChange={(e) => setDiscount(e.target.value)}
                                           className={ChangeItemCss.input + ' ' + ChangeItemCss.margin + ' ' + ChangeItemCss.margin_small + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                           placeholder="Скидка %"/>
                                </div>
                            </div>
                            :
                            <div/>
                        }
                        <div className="col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-12">
                            <button onClick={clickChangeDiscount}
                                    className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.description_block}>
                <div className="container">
                    <div className="row">
                        <button onClick={clickAddInfo}
                                className={style_css.button + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-8 offset-2'}>
                            Добавить информацию
                        </button>
                        {info.map(i =>
                            <div className="description">
                                <textarea className={ChangeItemCss.des_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                    value={i.info}
                                    onChange={(e) => {
                                        const index = info.findIndex(el => el.id === i.id)
                                        setInfo(prevState => {
                                            const newState = [...prevState]
                                            newState[index].info = e.target.value
                                            return newState
                                        })
                                    }}
                                    placeholder="Введите описание"/>
                                <button onClick={() => clickChangeInfo(i, id)} className={ChangeItemCss.save + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4'}>Сохранить</button>
                                <button onClick={() => clickDeleteInfo(i)}
                                        className={style_css.mt + ' ' + style_css.delete +
                                            ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-4 offset-1'}>
                                    Удалить
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangeItem;