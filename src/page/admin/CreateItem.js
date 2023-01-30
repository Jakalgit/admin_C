import React, {useEffect, useState} from 'react';
import style_css from '../../css/admin/CreateItem.module.css'
import {createItem} from "../../http/API/itemAPI"
import {createItemColor} from "../../http/API/colorAPI"
import {createItemInfo} from "../../http/API/itemAPI"
import ModalWindow from "../../components/ModalWindow";
import Footer from "../../components/Footer";

const CreateItem = ({currentData, updateData, dataIn, tags}) => {

    const [dataId, setDataId] = useState(currentData.id)

    const [currentTags, setCurrentTags] = useState(currentData.tags)
    const [filteredTags, setFilteredTags] = useState([])

    const [nameTag, setNameTag] = useState('')

    const [nameItem, setNameItem] = useState(currentData.name)
    const [priceItem, setPriceItem] = useState(currentData.price)
    const [length, setLength] = useState(currentData.length)
    const [width, setWidth] = useState(currentData.width)
    const [height, setHeight] = useState(currentData.height)
    const [weight, setWeight] = useState(currentData.weight)
    const [availability, setAvailability] = useState(currentData.stock)
    const [visibility, setVisibility] = useState(currentData.visible)
    const [discountFlag, setDiscountFlag] = useState(currentData.with_discount)
    const [oldPrice, setOldPrice] = useState(currentData.with_discount ? currentData.old_price : '')
    const [discount, setDiscount] = useState(currentData.with_discount ? currentData.discount : '')
    const [isNew, setIsNew] = useState(currentData.is_new)
    const [article, setArticle] = useState(currentData.article)

    const [color, setColor] = useState(currentData.color)

    const [info, setInfo] = useState(currentData.info)

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')

    const setData = () => {
        setDataId(currentData.id)
        setCurrentTags(currentData.tags)
        setNameItem(currentData.name)
        setPriceItem(currentData.price)
        setLength(currentData.length)
        setWidth(currentData.width)
        setHeight(currentData.height)
        setWeight(currentData.weight)
        setAvailability(currentData.stock)
        setVisibility(currentData.visible)
        setDiscountFlag(currentData.with_discount)
        setOldPrice(currentData.with_discount ? currentData.old_price : '')
        setDiscount(currentData.with_discount ? currentData.discount : '')
        setIsNew(currentData.is_new)
        setInfo(currentData.info)
        setColor(currentData.color)
        setArticle(currentData.article)
    }

    useEffect(() => {
        updateData(dataIn.map(data => {
            if (data.id === dataId) {
                return {
                    id: dataId,
                    name: nameItem,
                    price: priceItem,
                    stock: availability,
                    with_discount: discountFlag,
                    visible: visibility,
                    is_new: isNew,
                    width: width,
                    length: length,
                    height: height,
                    weight: weight,
                    old_price: oldPrice,
                    discount: discount,
                    article: article,
                    color: color,
                    tags: currentTags,
                    info: info,
                }
            }
            return data
        }))
        setData()
    }, [currentData])

    useEffect(() => {
        if (nameTag) {
            setFilteredTags(Object.values(tags).filter(tag => {
                return tag.name.toLowerCase().includes(nameTag.toLowerCase())
            }))
        } else {
            setFilteredTags(tags)
        }
    }, [nameTag])

    const addInfo = () => {
        setInfo([...info, {info: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectImg_1 = (e) => {
        if (e.target.files[0]) {
            setColor({...color, img1: e.target.files[0]})
        }
    }

    const removeImg_1 = () => {
        setColor({...color, img1: null})
    }

    const selectImg_2 = (e) => {
        if (e.target.files[0]) {
            setColor({...color, img2: e.target.files[0]})
        }
    }

    const removeImg_2 = () => {
        setColor({...color, img2: null})
    }

    const selectImg_3 = (e) => {
        if (e.target.files[0]) {
            setColor({...color, img3: e.target.files[0]})
        }
    }

    const removeImg_3 = () => {
        setColor({...color, img3: null})
    }

    const selectImg_4 = (e) => {
        if (e.target.files[0]) {
            setColor({...color, img4: e.target.files[0]})
        }
    }

    const removeImg_4 = () => {
        setColor({...color, img4: null})
    }

    const changeInfo = (value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, 'info' : value} : i))
    }

    const addTag = (tag) => {
        if (!currentTags.includes(tag)) {
            setCurrentTags([...currentTags, tag])
        }
    }

    const deleteTag = (tag) => {
        setCurrentTags(currentTags.filter(item => item.name !== tag.name))
    }

    const addItem = () => {
        let disc
        if (discountFlag) {
            disc = (discount && oldPrice);
        } else {
            disc = true
        }
        if (nameItem && info && length && article && color.img1 !== null && color.img2 !== null && color.img3 !== null &&
            color.img4 !== null && width && height && weight && priceItem && disc) {
            const formData = new FormData()

            if (!discountFlag) {
                setDiscount('0')
                setOldPrice('0')
            }

            const stringifyTags = JSON.stringify(currentTags)

            formData.append('name', nameItem)
            formData.append('price', priceItem)
            formData.append('length', `${length}`)
            formData.append('width', `${width}`)
            formData.append('height', `${height}`)
            formData.append('weight', `${weight}`)
            formData.append('availability', `${availability}`)
            formData.append('visibility', `${visibility}`)
            formData.append('oldPrice', `${oldPrice}`)
            formData.append('discount', `${discount}`)
            formData.append('discountFlag', `${discountFlag}`)
            formData.append('new_item', `${isNew}`)
            formData.append('article', `${article}`)
            formData.append('tags', `${stringifyTags}`)
            createItem({formData}).then(data => {
                setPriceItem('')
                setNameItem('')
                setLength('')
                setWidth('')
                setHeight('')
                setWeight('')
                setOldPrice('')
                setDiscount('')
                setCurrentTags([])

                info.forEach(i => {
                    createItemInfo(i.info, data.id).then()
                })

                setInfo([])

                const formDataColors = new FormData()
                const itemId = String(data.id)
                formDataColors.append('itemId', `${itemId}`)
                formDataColors.append('img_1', color.img1)
                formDataColors.append('img_2', color.img2)
                formDataColors.append('img_3', color.img3)
                formDataColors.append('img_4', color.img4)
                createItemColor(formDataColors).then(() => {
                    updateData(dataIn.filter(el => el.id !== currentData.id))
                    setData()
                    setModalText('Товар добавлен')
                    setShowModal(true)
                })
            })
        } else {
            setModalText('Заполните все поля')
            setShowModal(true)
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className={style_css.tags_block
                        + ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                        <input value={nameTag}
                               onChange={e => setNameTag(e.target.value)}
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
                </div>
            </div>
            <div className={style_css.sub_line}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   value={nameItem} onChange={e => setNameItem(e.target.value)} placeholder="Название" />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <input type="number" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   value={priceItem} onChange={e => setPriceItem(e.target.value)} placeholder="Цена" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.color}>
                <div className="container">
                    <div className="row">
                        <div className="row">
                            <div style={{marginTop: '1rem'}}>
                                <input
                                    type="text"
                                    className={style_css.input +
                                        ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-10 offset-1'}
                                    value={article}
                                    onChange={e => setArticle(e.target.value)}
                                    placeholder="Артикул"
                                />
                            </div>
                            <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                <button onClick={removeImg_1} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    Удалить
                                </button>
                                <label className={style_css.input_file}>
                                    <input onChange={e => {selectImg_1(e)}} type="file" className={style_css.file}/>
                                    <h2 className={style_css.file_text}>{color.img1 !== null ? color.img1.name : 'Выберете изображение 1'}</h2>
                                </label>
                            </div>
                            <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                <button onClick={removeImg_2} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    Удалить
                                </button>
                                <label className={style_css.input_file}>
                                    <input onChange={e => {selectImg_2(e)}} type="file" className={style_css.file}/>
                                    <h2 className={style_css.file_text}>{color.img2 !== null ? color.img2.name : 'Выберете изображение 2'}</h2>
                                </label>
                            </div>
                            <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                <button onClick={removeImg_3} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    Удалить
                                </button>
                                <label className={style_css.input_file}>
                                    <input onChange={e => {selectImg_3(e)}} type="file" className={style_css.file}/>
                                    <h2 className={style_css.file_text}>{color.img3 !== null ? color.img3.name : 'Выберете изображение 3'}</h2>
                                </label>
                            </div>
                            <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                <button onClick={removeImg_4} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    Удалить
                                </button>
                                <label className={style_css.input_file}>
                                    <input onChange={e => {selectImg_4(e)}} type="file" className={style_css.file}/>
                                    <h2 className={style_css.file_text}>{color.img4 !== null ? color.img4.name : 'Выберете изображение 4'}</h2>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.checkboxes}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-0">
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="stock"
                                       onClick={() => {
                                           setAvailability(true)
                                       }} checked={availability} />
                                <h2 className={style_css.line_text}>В наличии</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="stock"
                                       onClick={() => {
                                           setAvailability(false)
                                       }} checked={!availability} />
                                <h2 className={style_css.line_text}>Нет в наличии</h2>
                            </div>
                        </div>
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-0">
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="visibility"
                                       onClick={() => {
                                           setVisibility(true)
                                       }} checked={visibility}/>
                                <h2 className={style_css.line_text}>Видимый</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="visibility"
                                       onClick={() => {
                                           setVisibility(false)
                                       }} checked={!visibility}/>
                                <h2 className={style_css.line_text}>Невидимый</h2>
                            </div>
                        </div>
                        <div className={style_css.check_mt + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-3'}>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-4'}>
                                <input type="radio" className={style_css.radio} name="new"
                                       onClick={() => {
                                           setIsNew(true)
                                       }} checked={isNew}/>
                                <h2 className={style_css.line_text}>Новинка</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-4'}>
                                <input type="radio" className={style_css.radio} name="new"
                                       onClick={() => {
                                           setIsNew(false)
                                       }} checked={!isNew}/>
                                <h2 className={style_css.line_text}>Не новинка</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.proportions}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Длина(см)"
                                   value={length} onChange={e => setLength(e.target.value)}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Ширина(см)"
                                   value={width} onChange={e => setWidth(e.target.value)}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Высота(см)"
                                   value={height} onChange={e => setHeight(e.target.value)}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Вес(кг)"
                                   value={weight} onChange={e => setWeight(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.discount}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-3">
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="discount"
                                       onClick={() => {
                                           setDiscountFlag(true)
                                       }} checked={discountFlag}/>
                                    <h2 className={style_css.line_text}>Со скидкой</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="discount"
                                       onClick={() => {
                                           setDiscountFlag(false)
                                       }} checked={!discountFlag}/>
                                    <h2 className={style_css.line_text}>Без скидки</h2>
                            </div>
                        </div>
                        {discountFlag ?
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                                <input type="number" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Старая цена"
                                       value={oldPrice} onChange={e => setOldPrice(e.target.value)}/>
                            </div>
                            :
                            <div/>
                        }
                        {discountFlag ?
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                                <input type="number" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Скидка %"
                                       value={discount} onChange={e => setDiscount(e.target.value)}/>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                </div>
            </div>
            <div className={style_css.information}>
                <div className="container">
                    <div className="row">
                        <button onClick={addInfo}
                            className={style_css.button + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-8 offset-2'}>
                            Добавить информацию
                        </button>
                        <div className="list-info">
                            {info.map(i =>
                                <div key={i.number} className="description">
                                <textarea key={i.number} className={style_css.des_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Введите описание"
                                          onChange={(e) => changeInfo(e.target.value, i.number)} value={i.info}/>
                                    <button key={i.number} onClick={() => removeInfo(i.number)}
                                        className={style_css.mt + ' ' + style_css.delete + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>Удалить
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <button onClick={addItem}
                        className={style_css.add_item + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-8 offset-2'}>
                            Добавить товар
                    </button>
                </div>
            </div>
            <Footer />
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)}/>
        </div>
    );
};

export default CreateItem;