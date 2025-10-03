
import express from 'express';
import { Blockchain, Transaction } from './blockchain.js';
import { ParticipantRegistry } from './participants.js';
import { SmartContract } from './smartContract.js';
import { Analytics } from './analytics.js';
import { IdentityManager } from './identity.js';
import { IoTManager } from './iot.js';
import { SustainabilityTracker } from './sustainability.js';
import { InteropManager } from './interop.js';
import { DisputeManager } from './dispute.js';
import { TokenManager } from './token.js';
import { ZKP } from './zkp.js';
import { ReputationManager } from './reputation.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

const blockchain = new Blockchain();
const registry = new ParticipantRegistry();
const identityManager = new IdentityManager();
const iotManager = new IoTManager();
const sustainabilityTracker = new SustainabilityTracker();
const interopManager = new InteropManager();
const disputeManager = new DisputeManager();
const tokenManager = new TokenManager();
// Root route for welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Supply Chain Blockchain API! Try /participants, /chain, /dashboard/summary, etc.');
});

// Onboard participant
app.post('/participants', (req, res) => {
  const { id, name, role } = req.body;
  registry.addParticipant({ id, name, role });
  blockchain.addParticipant(id);
  // Create DID for participant
  const did = identityManager.createDID({ id, name, role });
  res.json({ message: 'Participant added', id, did });
});

// List participants
app.get('/participants', (req, res) => {
  res.json(registry.getAllParticipants());
});

// List DIDs
app.get('/dids', (req, res) => {
  res.json(identityManager.getAllDIDs());
});

// Log IoT sensor data
app.post('/iot/sensor', (req, res) => {
  const { deviceId, type, value, timestamp, location } = req.body;
  iotManager.logSensorData({ deviceId, type, value, timestamp, location });
  res.json({ message: 'Sensor data logged' });
});

// Get all IoT sensor events
app.get('/iot/sensor', (req, res) => {
  res.json(iotManager.getSensorEvents());
});

// Record sustainability metric
app.post('/sustainability/metric', (req, res) => {
  const { productId, carbonEmissions, waterUsage, ethicalSourcing, timestamp } = req.body;
  sustainabilityTracker.recordMetric({ productId, carbonEmissions, waterUsage, ethicalSourcing, timestamp });
  res.json({ message: 'Sustainability metric recorded' });
});

// Get sustainability metrics
app.get('/sustainability/metric', (req, res) => {
  const { productId } = req.query;
  const metrics = sustainabilityTracker.getMetrics(productId as string | undefined);
  res.json(metrics);
});

// Record external chain event
app.post('/interop/event', (req, res) => {
  const { chainName, eventId, data, timestamp } = req.body;
  interopManager.recordEvent({ chainName, eventId, data, timestamp });
  res.json({ message: 'External chain event recorded' });
});

// Get external chain events
app.get('/interop/event', (req, res) => {
  const { chainName } = req.query;
  const events = interopManager.getEvents(chainName as string | undefined);
  res.json(events);
});

// Dashboard summary endpoint
app.get('/dashboard/summary', (req, res) => {
  res.json({
    chainLength: blockchain.chain.length,
    participantCount: registry.getAllParticipants().length,
    didCount: identityManager.getAllDIDs().length,
    sensorEventCount: iotManager.getSensorEvents().length,
    sustainabilityMetricsCount: sustainabilityTracker.getMetrics().length,
    externalChainEventsCount: interopManager.getEvents().length,
  });
});

// Raise dispute
app.post('/dispute', (req, res) => {
  const { transactionId, raisedBy, reason, timestamp } = req.body;
  const id = crypto.randomUUID();
  disputeManager.raiseDispute({ id, transactionId, raisedBy, reason, status: 'open', timestamp });
  res.json({ message: 'Dispute raised', id });
});

// Resolve dispute
app.post('/dispute/resolve', (req, res) => {
  const { id, resolution } = req.body;
  disputeManager.resolveDispute(id, resolution);
  res.json({ message: 'Dispute resolved', id });
});

// Reject dispute
app.post('/dispute/reject', (req, res) => {
  const { id, reason } = req.body;
  disputeManager.rejectDispute(id, reason);
  res.json({ message: 'Dispute rejected', id });
});

// Get disputes
app.get('/dispute', (req, res) => {
  const { status } = req.query;
  const disputes = disputeManager.getDisputes(status as string | undefined);
  res.json(disputes);
});

// Transfer tokens (reward/incentive)
app.post('/token/transfer', (req, res) => {
  const { from, to, amount, reason, timestamp } = req.body;
  tokenManager.transfer(from, to, amount, reason, timestamp);
  res.json({ message: 'Token transferred' });
});

// Get token balance
app.get('/token/balance', (req, res) => {
  const { participantId } = req.query;
  const balance = tokenManager.getBalance(participantId as string);
  res.json({ participantId, balance });
});

// Get token transactions
app.get('/token/transactions', (req, res) => {
  const { participantId } = req.query;
  const transactions = tokenManager.getTransactions(participantId as string | undefined);
  res.json(transactions);
});

// Zero-Knowledge Proof for compliance
app.post('/zkp/compliance', (req, res) => {
  const { value, threshold } = req.body;
  const result = ZKP.proveCompliance(value, threshold);
  res.json(result);
});

// Automated quality control recall
app.post('/smart-contract/quality-recall', (req, res) => {
  const { transaction } = req.body;
  const recall = SmartContract.qualityRecall(transaction);
  res.json({ recall });
});

// Add supplier rating
const reputationManager = new ReputationManager();
app.post('/reputation/rate', (req, res) => {
  const { supplierId, ratedBy, score, feedback, timestamp } = req.body;
  reputationManager.addRating({ supplierId, ratedBy, score, feedback, timestamp });
  res.json({ message: 'Rating added' });
});

// Get supplier ratings
app.get('/reputation/ratings', (req, res) => {
  const { supplierId } = req.query;
  const ratings = reputationManager.getRatings(supplierId as string | undefined);
  res.json(ratings);
});

// Get supplier average score
app.get('/reputation/average', (req, res) => {
  const { supplierId } = req.query;
  const avg = reputationManager.getAverageScore(supplierId as string);
  res.json({ supplierId, averageScore: avg });
});

// Create transaction
app.post('/transactions', (req, res) => {
  const { type, data, participants } = req.body;
  const transaction: Transaction = {
    id: crypto.randomUUID(),
    type,
    data,
    timestamp: Date.now(),
    participants,
  };
  blockchain.createTransaction(transaction);
  res.json({ message: 'Transaction created', transaction });
});

// Mine block (requires consensus)
app.post('/mine', (req, res) => {
  const { consensusParticipants } = req.body;
  try {
    const block = blockchain.minePendingTransactions(consensusParticipants);
    res.json({ message: 'Block mined', block });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get blockchain
app.get('/chain', (req, res) => {
  res.json(blockchain.chain);
});

// Smart contract endpoint (simulate business logic)
app.post('/smart-contract/verify-delivery', (req, res) => {
  const { transaction } = req.body;
  const result = SmartContract.verifyDelivery(transaction);
  res.json({ verified: result });
});

app.post('/smart-contract/release-payment', (req, res) => {
  const { transaction } = req.body;
  const result = SmartContract.releasePayment(transaction);
  res.json({ paymentReleased: result });
});

app.post('/smart-contract/temperature-alert', (req, res) => {
  const { transaction } = req.body;
  const result = SmartContract.temperatureAlert(transaction);
  res.json({ alert: result });
});

// Regulatory compliance check
app.post('/smart-contract/compliance', (req, res) => {
  const { transaction, rules } = req.body;
  const result = SmartContract.checkCompliance(transaction, rules);
  res.json({ compliant: result });
});

// AI-powered analytics: anomaly detection
app.get('/analytics/anomalies', (req, res) => {
  const anomalies = Analytics.detectAnomalies(blockchain.chain.flatMap(b => b.transactions));
  res.json({ anomalies });
});


app.listen(PORT, () => {
  console.log(`Supply Chain Blockchain API running on port ${PORT}`);
});
