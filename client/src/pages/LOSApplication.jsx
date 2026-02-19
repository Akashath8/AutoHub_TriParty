import { useState } from 'react';
import { Container, Card, ProgressBar, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import axios from 'axios';

const LOSApplication = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        pan: '', aadhaar: '',
        fullName: 'Avinash S.', dob: '1990-01-01', gender: 'Male',
        income: '', empType: 'salaried',
        loanAmount: 500000, tenure: 36
    });
    const [docs, setDocs] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleUpload = (docName) => {
        // Mock upload
        setDocs({ ...docs, [docName]: true });
    };

    const handleSubmit = async () => {
        try {
            // Mock submission
            alert('Application Submitted Successfully!');
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Navigation />
            <Container className="py-5" style={{ maxWidth: '800px' }}>
                <div className="mb-4">
                    <h4 className="mb-3">Loan Application</h4>
                    <ProgressBar now={(step / 5) * 100} label={`Step ${step} of 5`} variant="success" />
                </div>

                <Card className="shadow-sm border-0">
                    <Card.Body className="p-5">
                        {step === 1 && (
                            <div>
                                <h5 className="mb-4">Verification (PAN & Aadhaar)</h5>
                                <Row className="g-3">
                                    <Col md={12}>
                                        <Form.Label>PAN Number</Form.Label>
                                        <Form.Control name="pan" value={formData.pan} onChange={handleChange} placeholder="ABCDE1234F" />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Label>Aadhaar Number</Form.Label>
                                        <Form.Control name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="xxxx xxxx xxxx" />
                                    </Col>
                                </Row>
                                <div className="text-end mt-4">
                                    <Button onClick={nextStep} disabled={!formData.pan || !formData.aadhaar}>Next: Personal Details</Button>
                                    {!formData.pan && <div className="text-muted small mt-2">Enter PAN/Aadhaar to proceed (Mock: Any value works)</div>}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h5 className="mb-4">Personal Details</h5>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control name="fullName" value={formData.fullName} onChange={handleChange} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                            <option>Male</option><option>Female</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                                    <Button onClick={nextStep}>Next: Financials</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h5 className="mb-4">Occupational & Financials</h5>
                                <div className="mb-3">
                                    <Form.Check inline type="radio" label="Salaried" name="empType" value="salaried" checked={formData.empType === 'salaried'} onChange={handleChange} />
                                    <Form.Check inline type="radio" label="Self-Employed" name="empType" value="self" checked={formData.empType === 'self'} onChange={handleChange} />
                                </div>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Label>Net Monthly Income</Form.Label>
                                        <Form.Control type="number" name="income" value={formData.income} onChange={handleChange} />
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                                    <Button onClick={nextStep}>Next: Documents</Button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <h5 className="mb-4">Document Uploads</h5>
                                <Alert variant="info">Please upload the following documents.</Alert>

                                {['PAN Card', 'Aadhaar Card', 'Bank Statement'].map(doc => (
                                    <div key={doc} className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                        <span>{doc}</span>
                                        {docs[doc] ? (
                                            <span className="text-success"><i className="fas fa-check-circle"></i> Uploaded</span>
                                        ) : (
                                            <Button size="sm" variant="outline-primary" onClick={() => handleUpload(doc)}>Upload</Button>
                                        )}
                                    </div>
                                ))}

                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                                    <Button onClick={nextStep}>Next: Loan Config</Button>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div>
                                <h5 className="mb-4">Loan Configuration</h5>
                                <div className="mb-3">
                                    <Form.Label>Loan Amount: ₹{formData.loanAmount.toLocaleString()}</Form.Label>
                                    <Form.Range min={100000} max={2000000} step={10000} value={formData.loanAmount} onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })} />
                                </div>
                                <div className="mb-3">
                                    <Form.Label>Tenure: {formData.tenure} Months</Form.Label>
                                    <Form.Range min={12} max={84} step={6} value={formData.tenure} onChange={(e) => setFormData({ ...formData, tenure: Number(e.target.value) })} />
                                </div>

                                <Card className="bg-light p-3 mb-3">
                                    <div className="d-flex justify-content-between">
                                        <span>EMI:</span>
                                        <strong>₹{Math.round((formData.loanAmount + (formData.loanAmount * 0.1)) / formData.tenure)}/mo</strong>
                                    </div>
                                </Card>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                                    <Button variant="success" size="lg" onClick={handleSubmit}>Submit Application</Button>
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LOSApplication;
