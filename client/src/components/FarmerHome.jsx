import { useState, useEffect } from 'react';
import { Col, Container, Row, Modal, Button, Form } from 'react-bootstrap';
import './FarmerHome.css';
import { addProduct, updateProduct, getAllProducts, deleteProduct } from '../apis/product.api.js'
import auth from '../helpers/auth.helper.js'

export default function FarmerHome() {

    const [productData, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        imgURL: '',
        originalprice: '',
        sellingprice: '',
        stock: '',
        category: ''
    });

    const jwt = auth.isAuthenticated()

    // Fetch products when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getAllProducts({t: jwt.token}); // Call the async function and wait for the data
                setProducts(products); // Set the fetched data into the state
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData(); // Call the async function
    }, []);

    // Function to refetch product data
    const fetchProductData = async () => {
        try {
            const products = await getAllProducts({t: jwt.token});
            setProducts(products);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    // Handler to show the modal for adding a product
    const handleAddProduct = () => {
        setIsEditing(false);
        setFormData({
            id: '',
            name: '',
            description: '',
            imgURL: '',
            originalprice: '',
            sellingprice: '',
            stock: '',
            category: ''
        });
        setShowModal(true);
    };

    // Handler to show the modal for editing a product
    const handleEditProduct = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({
            id: product._id,
            name: product.name,
            description: product.description,
            imgURL: product.imgURL,
            originalprice: product.originalprice,
            sellingprice: product.sellingprice,
            stock: product.stock,
            category: product.category
        });
        setShowModal(true);
    };

    // Handler to close the delete modal
    const handleDeleteClick = (productId) => {
        setCurrentProduct(productId);
        setShowDeleteModal(true);
    };

    // Handler to close the modal
    const handleClose = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setCurrentProduct(null);
    };

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler to submit the form
    const handleSubmit = async () => {
        if (isEditing) {
            await updateProduct(formData.id, formData, {t: jwt.token});
        } else {
            await addProduct(formData, {t: jwt.token});
        }
        await fetchProductData();
        handleClose();
    };

    const handleDeleteConfirm = async () => {
        await deleteProduct(currentProduct, {t: jwt.token});
        await fetchProductData(); 
        setShowDeleteModal(false);
    };


    return (<>
        <div className='farm-farmer-home'>
            <div className="farm-farmer-home-top">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="text-left text-white">
                                <div className="hero-innner-last-child">
                                    <h6 className="nt-hero-subtitle">FARM</h6>
                                    <h1 className="nt-hero-title h1">PRODUCTS</h1>
                                    <p className="nt-hero-description">Organic products can save your body and live</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="farm-farmer-home-bottom">
                <div className='cont'>
                    <h1>Products</h1>
                    <div>
                        <button className='btn btn-danger' onClick={handleAddProduct}>Add Product</button>
                    </div>
                </div>
                <Container>
                    <Row>
                        {productData.map((product, index) => (
                            <Col key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <img src={product.imgURL} width={200} height={200} />
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">${product.originalprice}</p>
                                        <p className="card-text">x{product.stock}</p>
                                        <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                            <div className="btn-group me-2" role="group" aria-label="First group">
                                                <button type="button" className="btn btn-outline-secondary menu-remove" onClick={() => handleEditProduct(product)}>Edit</button>
                                                <button type="button" className="btn btn-outline-danger menu-add" onClick={() => handleDeleteClick(product._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>


        {/* Add/Edit Product Modal */}
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            name="imgURL"
                            value={formData.imgURL}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Original Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter original price"
                            name="originalprice"
                            value={formData.originalprice}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Selling Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter selling price"
                            name="sellingprice"
                            value={formData.sellingprice}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter stock quantity"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {isEditing ? 'Update Product' : 'Add Product'}
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                    Confirm Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}