import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct, patchProd, patchUser } from '../../features/productSlice';
import style from './oneauction.module.css';
import io from 'socket.io-client';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
const socket = io.connect("http://localhost:3030");

const OneAuction = () => {

    const bet = useSelector(state => state.application.id);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [err, setErr] = useState(false);
    const products = useSelector(state => state.product.product);
    const [priceStart, setPriceStart] = useState('');

    const handle = (id, priceStart, bet) => {
        products.map((product) => {
            if (priceStart.trim().length && priceStart > product.priceStart) {
                socket.emit("disp_pat", { id, priceStart });
                setPriceStart('');
                socket.emit("disp_us", { id, bet });
                setErr(false);
                return
            }
            setErr(true);
        });
    }

    useEffect(() => {
        socket.on("receive", (data) => {
            dispatch(patchProd({ id: data.id, priceStart: data.priceStart }));
        });

        socket.on("receive_us", (data) => {
            dispatch(patchUser({ id: data.id, bet: data.bet }));
        });

        dispatch(fetchProduct());
    }, [dispatch]);

    return (<>
        <Header />
        <div className={style.main}>
            {products.map((product) => {
                if (id === product._id) {
                    return <div className={style.oneMain} key={product._id}>
                        <div className={style.oneName}><h2>{product.name}</h2></div>
                        <div className={style.oneDis}>
                            <div className={style.oneImg}><img alt='asdada' src={`${product.image}`} /></div>
                            <div className={style.oneDes}>{product.description}</div>
                        </div>
                        <div className={style.onePrice}><h4>Ставка: {product.priceStart}$</h4></div>
                        <div className={style.oneWin}>{product.bet === null ? 'Нет ни одной ставки' : `Последнюю ставку сделал: ${product.bet.firstName}`}</div>
                    </div>
                }
                return null;
            })}
            <div className={style.inputer}>
                <input type='number' placeholder='Введите сумму' value={priceStart} onChange={(e) => setPriceStart(e.target.value)} />
                <button onClick={() => { handle(id, priceStart, bet) }}>Сделать ставку</button>
            </div>
            {err ? 'Нужна ставка выше предыдущей' : null}
        </div>
        <Footer />
    </>
    );
};

export default OneAuction;