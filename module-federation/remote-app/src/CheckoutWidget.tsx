import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, Row, Spinner } from 'react-bootstrap';
import {
    FaArrowAltCircleLeft,
    FaAngleDown,
    FaTrashAlt,
    FaCcMastercard,
    FaCcVisa,
    FaCcAmex,
    FaCcPaypal,
    FaLongArrowAltRight,
    FaPlus,
    FaMinus,
} from 'react-icons/fa';

const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');

    return await response.json();
};

const formatToTwoDecimals = (num: number) => num.toFixed(2);

const CheckoutWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const shippingPrice = 20;
    const subtotalPrice = products.reduce((acc, { price }) => acc + price, 0);
    const totalPrice = subtotalPrice + shippingPrice;

    useEffect(() => {
        setIsLoading(true);
        fetchProducts().then((data) => {
            setProducts(data.splice(0, 4));
            setIsLoading(false);
        });
    }, []);

    return (
        <section className="h-100 h-custom">
            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col>
                        <Card>
                            <Card.Body className="p-4">
                                <Row>
                                    <Col lg="7">
                                        <h5>
                                            <a href="#!" className="text-body">
                                                <FaArrowAltCircleLeft className="me-2" /> Continue shopping
                                            </a>
                                        </h5>

                                        <hr />

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Shopping cart</p>
                                                <p className="mb-0">You have 4 items in your cart</p>
                                            </div>
                                            <div>
                                                <p>
                                                    <span className="text-muted me-1">Sort by:</span>
                                                    <a href="#!" className="text-body">
                                                        price
                                                        <FaAngleDown className="mt-1" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>

                                        {isLoading ? (
                                            <div className="text-center py-5">
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </div>
                                        ) : null}

                                        {products?.map(({ id, image, price, title, description }) => {
                                            const count = Math.floor(Math.random() * 2) + 1;

                                            return (
                                                <Card className="mb-3" key={id}>
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center me-3">
                                                                <div>
                                                                    <Card.Img
                                                                        src={image}
                                                                        className="rounded-3"
                                                                        style={{ width: '65px' }}
                                                                        alt={title}
                                                                    />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{title}</h5>
                                                                    <p
                                                                        className="small mb-0 text-truncate"
                                                                        style={{ width: 150 }}
                                                                    >
                                                                        {description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center gap-3">
                                                                <div style={{ width: 130 }} className="d-flex">
                                                                    <Button variant="link" size="sm">
                                                                        <FaMinus />
                                                                    </Button>
                                                                    <FormControl
                                                                        className="mx-2"
                                                                        type="number"
                                                                        defaultValue={count}
                                                                        style={{ width: 60 }}
                                                                    />
                                                                    <Button variant="link" size="sm">
                                                                        <FaPlus />
                                                                    </Button>
                                                                </div>
                                                                <div className="text-center" style={{ width: 100 }}>
                                                                    <h5 className="mb-0">
                                                                        ${formatToTwoDecimals(count * price)}
                                                                    </h5>
                                                                </div>
                                                                <Button href="#!" variant="outline-danger" size="sm">
                                                                    <FaTrashAlt />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            );
                                        })}
                                    </Col>

                                    <Col lg="5">
                                        <Card className="bg-primary text-white rounded-3">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Card details</h5>
                                                    <Card.Img
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                        // fluid
                                                        className="rounded-3"
                                                        style={{ width: '45px' }}
                                                        alt="Avatar"
                                                    />
                                                </div>

                                                <p className="small">Card type</p>
                                                <a href="#!" type="submit" className="text-white display-5">
                                                    <FaCcMastercard className="fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white display-5">
                                                    <FaCcVisa className="fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white display-5">
                                                    <FaCcAmex className="fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white display-5">
                                                    <FaCcPaypal className="fa-2x me-2" />
                                                </a>

                                                <form className="mt-4">
                                                    <FormControl
                                                        className="mb-4"
                                                        type="text"
                                                        size="lg"
                                                        placeholder="Cardholder's Name"
                                                    />

                                                    <FormControl
                                                        className="mb-4"
                                                        type="text"
                                                        size="lg"
                                                        minLength={19}
                                                        maxLength={19}
                                                        placeholder="1234 5678 9012 3457"
                                                    />

                                                    <Row className="mb-4">
                                                        <Col md="6">
                                                            <FormControl
                                                                className="mb-4"
                                                                type="text"
                                                                size="lg"
                                                                minLength={7}
                                                                maxLength={7}
                                                                placeholder="MM/YYYY"
                                                            />
                                                        </Col>
                                                        <Col md="6">
                                                            <FormControl
                                                                className="mb-4"
                                                                type="password"
                                                                size="lg"
                                                                minLength={3}
                                                                maxLength={3}
                                                                placeholder="&#9679;&#9679;&#9679;"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </form>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">${formatToTwoDecimals(subtotalPrice)}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Shipping</p>
                                                    <p className="mb-2">${formatToTwoDecimals(shippingPrice)}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Total(Incl. taxes)</p>
                                                    <p className="mb-2">${formatToTwoDecimals(totalPrice)}</p>
                                                </div>

                                                <Button variant="success" size="lg" className="w-100 mt-3">
                                                    <div className="d-flex justify-content-between">
                                                        <span>${formatToTwoDecimals(totalPrice)}</span>
                                                        <span>
                                                            Checkout <FaLongArrowAltRight className="ms-2" />
                                                        </span>
                                                    </div>
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CheckoutWidget;
