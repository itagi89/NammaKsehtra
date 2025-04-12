"use client"
import React, { useEffect, useState } from 'react';
import styles from './ZillaPanchayat.module.css';
import { ZillaPanchayatInfo } from '../../types';
import api from '../../utils/api'; 

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string }) => void;
  editData?: ZillaPanchayatInfo;
}

// Modal Component for Add/Edit Zilla Panchayat
const AddZillaPanchayatModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSave, editData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(''); // Assuming description would be populated if available
    } else {
      setName('');
      setDescription('');
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{editData ? 'Edit' : 'Add'} Zilla Panchayat</h2>
          <div className={styles.breadcrumb}>Zilla Panchayat \ Configuration</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Demo"
              className={styles.formControl}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Demo"
              className={styles.formControl}
            />
          </div>
          
          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveButton}>
              <span className={styles.icon}>📋</span> Save
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              <span className={styles.icon}>✕</span> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
const ZillaPanchayat: React.FC = () => {
  const [panchayats, setPanchayats] = useState<ZillaPanchayatInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPanchayat, setEditingPanchayat] = useState<ZillaPanchayatInfo | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPanchayats();
  }, [currentPage, rowsPerPage]);

  
  const fetchPanchayats = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/zilla-panchayat?page=${currentPage}&limit=${rowsPerPage}`);
      console.log("Full Axios Response:", response);
      const records = response.data.records;
      console.log(`Fetched ${records.length} records`);
      setPanchayats(response.data.records);
      setTotalPages(Math.ceil(response.data.total / rowsPerPage));
    } 
    catch (err) {
      console.error("Failed to fetch Zilla Panchayats:", err);
      setError((err as Error).message);
    }
    finally{
        setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this Zilla Panchayat?")) {
      try {
        await api.delete(`/api/zilla-panchayat/${id}`);
        fetchPanchayats();
      } catch (error) {
        console.error("Failed to delete Zilla Panchayat:", error);
      }
    }
  };
const handleRowDoubleClick = async (id: number) =>{
    
}
  const handleSave = async (data: { name: string; description: string }) => {
    try {
      if (editingPanchayat) {
        // Update existing panchayat
        await api.put(`/api/zilla-panchayat/${editingPanchayat.id}`, data);
      } else {
        // Create new panchayat
        await api.post('/api/zilla-panchayat', data);
      }
      // Close modal and refresh list
      setIsModalOpen(false);
      setEditingPanchayat(undefined);
      fetchPanchayats();
    } catch (error) {
      console.error("Failed to save Zilla Panchayat:", error);
    }
  };

  const handleEdit = (panchayat: ZillaPanchayatInfo) => {
    setEditingPanchayat(panchayat);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPanchayat(undefined);
    setIsModalOpen(true);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.zillapanchayatlist}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>Configuration\<span className={styles.current}>Zilla Panchayat</span></div>
        <button 
          className={styles.addbutton}
          onClick={openAddModal}
        >
          ADD Zilla Panchayat
        </button>
      </div>

      <div className={styles.searchbar}>
        <input type="text" placeholder="Search" className={styles.searchinput} />
        <div className={styles.actions}>
          <button className={styles.actionbutton}>
            <span className={styles.icon}>⬇️</span>
          </button>
          <button className={styles.actionbutton}>
            <span className={styles.icon}>⬆️</span>
          </button>
        </div>
      </div>

      <div className={styles.tablecontainer}>
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th>S No</th>
              <th>Zilla Panchayat</th>
              <th>Description</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : panchayats.length === 0 ? (
              <tr>
                <td colSpan={4}>No Zilla Panchayats found</td>
              </tr>
            ) : (
              panchayats.map((panchayat, index) => (
                <tr key={panchayat.id}  onDoubleClick={()=> handleRowDoubleClick(panchayat.id)}>
                  <td>{String((currentPage - 1) * rowsPerPage + index + 1).padStart(2, '0')}</td>
                  <td>{panchayat.name}</td>
                  <td>{panchayat.description}</td>
                  <td>{new Date(panchayat.createdAt).toLocaleDateString('en-GB')}</td>
                  <td className={styles.actionscell}>
                    <button 
                      className={styles.editbuttonactionicon}
                      onClick={() => handleEdit(panchayat)}
                    >
                      ✏️
                    </button>
                    <button 
                      className={styles.deletebuttonactionicon}
                      onClick={() => handleDelete(panchayat.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.rowsperpage}>
          <span>Rows per page</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className={styles.pageinfo}>
          {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, (totalPages * rowsPerPage))} of {totalPages * rowsPerPage}
        </div>
        <div className={styles.pagebuttons}>
          <button 
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            ⟪
          </button>
          <button 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⟨
          </button>
          <button 
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ⟩
          </button>
          <button 
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            ⟫
          </button>
        </div>
      </div>

      {/* Modal for adding/editing */}
      <AddZillaPanchayatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editData={editingPanchayat}
      />
    </div>
  );
};

export default ZillaPanchayat;