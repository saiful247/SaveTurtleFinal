import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PurchaseData = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [startDate, setStartDate] = useState(''); // Start date for filter
  const [endDate, setEndDate] = useState(''); // End date for filter

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5555/purchaseList');
        setPurchases(response.data.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearchQuery = 
      purchase.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(purchase.phone).toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.productName.toLowerCase().includes(searchQuery.toLowerCase());
  
    // Convert purchaseDate and startDate/endDate to Date objects for comparison
    const purchaseDate = new Date(purchase.purchaseDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    // Check if purchaseDate falls within the selected date range inclusively
    const isWithinDateRange =
      (!start || purchaseDate >= start) &&
      (!end || purchaseDate <= end);
  
    return matchesSearchQuery && isWithinDateRange;
  });

  const totalPurchases = filteredPurchases.length;

  const totalAmount = filteredPurchases.reduce((sum, purchase) => sum + parseFloat(purchase.totalPrice), 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Purchase Data', 14, 16);
    
    const tableColumn = ['No.', 'Customer Name', 'Email', 'Phone', 'Product Name', 'Quantity', 'Total Price', 'Purchase Date'];
    const tableRows = [];

    filteredPurchases.forEach((purchase, index) => {
      const purchaseData = [
        index + 1,
        purchase.customerName,
        purchase.email,
        purchase.phone,
        purchase.productName,
        purchase.quantity,
        `LKR ${purchase.totalPrice}`,
        new Date(purchase.purchaseDate).toLocaleDateString(),
      ];
      tableRows.push(purchaseData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('purchase-data.pdf');
  };

  const sendEmail = async (email, status) => {
    try {
      await axios.post('http://localhost:5555/sendEmail', { email, status });
      alert(`Email successfully sent for ${status}!`);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center">
        <h1 className='text-3xl my-8'>Purchase List</h1>
        <div className="flex items-center gap-4">
        <Link to='/admin/dashboard'>
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              Admin Dashboard
            </button>
          </Link>
          <Link to='/products'>
          <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md transition duration-300">
          Product Management
            </button>
          </Link>
          <Link to='/productViews'>
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md transition duration-300">
          Add Purchase
            </button>
          </Link>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-lg text-gray-600">Total Purchases: {totalPurchases}</h3>
        <h3 className="text-lg text-gray-600">Total Amount: LKR {totalAmount.toFixed(2)}</h3>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Search by customer name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border border-gray-500 px-4 py-2 w-full max-w-xs'
        />
        {/* New Filter */}
        <div>
            <label className="mr-2">From:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='border border-gray-500 px-4 py-2'
            />
          </div>
          <div>
            <label className="mr-2">To:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='border border-gray-500 px-4 py-2'
            />
          </div>
        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300">
            Download PDF
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Slip
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approval
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((purchase, index) => (
                  <tr key={purchase._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.productSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      LKR {purchase.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {purchase.paymentSlipUrl ? (
                        <img
                          src={`http://localhost:5555${purchase.paymentSlipUrl}`}
                          alt="Payment"
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="mt-4 flex justify-center gap-x-4">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          onClick={() => sendEmail(purchase.email, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          onClick={() => sendEmail(purchase.email, 'disapproved')}
                        >
                          Disapprove
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/purchaseList/edit/${purchase._id}`}>
                          <AiOutlineEdit className='text-2xl text-yellow-600'/>
                        </Link>
                        <Link to={`/purchaseList/delete/${purchase._id}`}>
                          <MdOutlineDelete className='text-2xl text-red-600'/>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-6 py-4 text-center text-sm text-gray-500">
                    No Purchases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseData;