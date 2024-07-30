import {Rating} from '@mui/material';
import {useNavigate} from 'react-router-dom';

import {productId} from './model/helpers/constants';
import {useGetProductById} from './model/hooks/useGetProductById';

import {updateCart} from '@/features/cart/model/api/api';
import {addItem} from '@/features/cart/model/slice/cart.slice';
import {
    MyButton,
    Title,
    arrowLeft,
    formatPrice,
    noneStar,
    star,
    undoImg,
    useAppDispatch,
    useAppSelector,
} from '@/shared';

import styles from './view.module.css';

export const ProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {card} = useGetProductById(Number(productId));
    const cartItems = useAppSelector((state) => state.cart.cart);

    if (!card) {
        return <div></div>;
    }

    const handler = () => {
        const newItem = {
            product: {
                id: card.id,
                title: card.title,
                description: card.description,
                category: card.category,
                price: card.price,
                picture: card.picture,
                rating: card.rating,
            },
            quantity: 1,
        };

        dispatch(addItem(newItem));
        dispatch(updateCart([...cartItems, newItem]));
    };

    return (
        <div className={styles['product-page']}>
            <a className={styles['product-page__back']} onClick={() => navigate(-1)}>
                <img src={arrowLeft} alt="back" className={styles['product-page__back-img']} />
                Назад
            </a>
            <div className={styles['product-page__container']}>
                <div className={styles['product-page__main']}>
                    <img
                        src={card?.picture}
                        alt={card?.title}
                        className={styles['product-page__picture']}
                    />
                    <div className={styles['product-page__information']}>
                        <Title style="bigName">{card?.title}</Title>
                        <Rating
                            value={Number(card?.rating)}
                            icon={<img src={star} alt="star" />}
                            readOnly
                            emptyIcon={<img src={noneStar} alt="star" />}
                            className={styles['product-page__rating']}
                        />
                        <div className={styles['product-page__price']}>
                            <Title style="bigPrice">{formatPrice(Number(card?.price))}</Title>
                        </div>
                        <div className={styles['product-page__add-to-cart-btn']}>
                            <MyButton onClick={handler}>Добавить в корзину</MyButton>
                        </div>
                        <div className={styles['product-page__return-condition']}>
                            <Title style="bold">
                                <img
                                    src={undoImg}
                                    alt="img"
                                    className={styles['product-page__return-condition-img']}
                                />
                                Условие возврата
                            </Title>
                            <h3 className={styles['product-page__return-condition-text']}>
                                Обменять или вернуть товар надлежащего качества можно в течение 14
                                дней с момента покупки.
                            </h3>
                            <h4 className={styles['product-page__prices-may-vary']}>
                                Цены в интернет-магазине могут отличаться от розничных магазинов.
                            </h4>
                        </div>
                    </div>
                </div>
                <div className={styles['product-page__description']}>
                    <Title style="bold">Описание</Title>
                    <div
                        className={styles['product-page__description-text']}
                        dangerouslySetInnerHTML={{
                            __html: card?.description,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
