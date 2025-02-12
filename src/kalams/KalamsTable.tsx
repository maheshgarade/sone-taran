import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { calculateAnnualCompoundInterest, calculateMonthsAndDays } from "../utils/calculatorUtils";

// Define the interfaces
interface Address {
  street: string;
  city: string;
  zip: number;
}

interface Customer {
  name: string;
  phone: number[];
  address: Address;
}

interface Kalam {
  name: string;
  type: string;
  netWeight: number;
  grossWeight: number;
  purity: number;
  goldRateAtLoan: number;
}

interface Loan {
  totalAmt: number;
  customerAmt: number;
  dukandarAmt: number;
  customerROI: number;
  merchantROI: number;
  loanStartDate: string;
}

interface Merchant {
  name: string;
  shopName: string;
  address: Address;
  phone: number[];
}

interface CustomerData {
  customer: Customer;
  kalam: Kalam;
  loan: Loan;
  merchant: Merchant;
}

// Sample Data
const customers: CustomerData[] = [
  {
    customer: {
      name: "Mangal Aastul",
      phone: [9850929698, 9850929689],
      address: {
        street: "Maa Ganga Colony",
        city: "Pune",
        zip: 411017
      }
    },
    kalam: {
      name: "Pendant Mani",
      type: "gold",
      netWeight: 4,
      grossWeight: 4,
      purity: 80,
      goldRateAtLoan: 8200
    },
    loan: {
      totalAmt: 12000,
      customerAmt: 5000,
      dukandarAmt: 7000,
      customerROI: 3,
      merchantROI: 2,
      loanStartDate: "3-2-2021"
    },
    merchant: {
      name: "Rajhans",
      shopName: "Guru Gold",
      address: {
        street: "Maa Ganga Colony",
        city: "Pune",
        zip: 411017
      },
      phone: [9850929698]
    }
  }
];

const KalamsTable: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedKalam, setSelectedKalam] = useState<Kalam | null>(null);
  const navigate = useNavigate();

  const calculateTodaysValue = () => '-';

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Kalam</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Loan Amt</TableCell>
              <TableCell>Amt Due</TableCell>
              <TableCell>Customer ROI</TableCell>
              <TableCell>Merchant</TableCell>
              
              <TableCell>Today's Value</TableCell>
              <TableCell>Validity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {customers.map((customer, index) => {
    const { totalMonths, days } = calculateMonthsAndDays(customer.loan.loanStartDate);
    console.log('totalMonths ', totalMonths, 'days ', days)
    return (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{index + 1001}</TableCell>

        {/* Customer Name + Info Icon */}
        <TableCell>
          {customer.customer.name}
          <IconButton onClick={() => setSelectedCustomer(customer.customer)}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </TableCell>

        {/* Kalam Name + Info Icon */}
        <TableCell>
          {customer.kalam.name}
          <IconButton onClick={() => setSelectedKalam(customer.kalam)}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </TableCell>

        <TableCell>{customer.loan.loanStartDate}</TableCell>
        <TableCell>₹{customer.loan.customerAmt}</TableCell>
        <TableCell>
          ₹{calculateAnnualCompoundInterest(customer.loan.customerAmt, customer.loan.customerROI * 12, totalMonths, days)}
        </TableCell>
        <TableCell>{customer.loan.customerROI}%</TableCell>
        <TableCell>{customer.merchant.shopName}</TableCell>
        <TableCell>{calculateTodaysValue()}</TableCell>
        <TableCell>-</TableCell>
        <TableCell>
          <IconButton onClick={() => navigate(`/kalams/${index + 1001}`)}>
            <Visibility fontSize="small" color="primary" />
          </IconButton>
          <IconButton>
            <Edit fontSize="small" color="secondary" />
          </IconButton>
          <IconButton>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

        </Table>
      </TableContainer>

      {/* Customer Info Dialog */}
      <Dialog open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)}>
        <DialogTitle>Customer Info</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <List>
              <ListItem>
                <ListItemText primary="Address" secondary={`${selectedCustomer.address.street}, ${selectedCustomer.address.city} - ${selectedCustomer.address.zip}`} />
              </ListItem>
              {selectedCustomer.phone.map((phone, index) => (
                <ListItem key={index} component="a" href={`tel:${phone}`}>
                  <ListItemText primary="Phone" secondary={phone} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Kalam Info Dialog */}
      <Dialog open={!!selectedKalam} onClose={() => setSelectedKalam(null)}>
        <DialogTitle>Kalam Details</DialogTitle>
        <DialogContent>
          {selectedKalam && (
            <List>
              <ListItem>
                <ListItemText primary="Type" secondary={selectedKalam.type} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Net Weight" secondary={`${selectedKalam.netWeight}g`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gross Weight" secondary={`${selectedKalam.grossWeight}g`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Purity" secondary={`${selectedKalam.purity}%`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gold Rate at Loan" secondary={`₹${selectedKalam.goldRateAtLoan}`} />
              </ListItem>
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KalamsTable;
