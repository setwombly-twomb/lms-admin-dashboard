import { useState } from 'react';
import { Card, message } from 'antd';
import PageHeader from '../../components/common/PageHeader';
import CsvUploader from '../../components/BulkImport/CsvUploader';
import ImportPreview from '../../components/BulkImport/ImportPreview';
import type { CsvRow, ValidationError } from '../../types';

function validateRows(data: CsvRow[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validRoles = ['admin', 'instructor', 'learner'];

  data.forEach((row, i) => {
    if (!row.name?.trim()) {
      errors.push({ row: i, field: 'name', message: 'Name is required' });
    }
    if (!row.email?.trim()) {
      errors.push({ row: i, field: 'email', message: 'Email is required' });
    } else if (!emailRegex.test(row.email)) {
      errors.push({ row: i, field: 'email', message: 'Invalid email format' });
    }
    if (row.role && !validRoles.includes(row.role.toLowerCase())) {
      errors.push({ row: i, field: 'role', message: `Invalid role. Must be: ${validRoles.join(', ')}` });
    }
  });
  return errors;
}

export default function BulkImport() {
  const [csvData, setCsvData] = useState<CsvRow[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleParsed = (data: CsvRow[], hdrs: string[]) => {
    setCsvData(data);
    setHeaders(hdrs);
    setErrors(validateRows(data));
  };

  const handleConfirm = () => {
    message.success(`Successfully imported ${csvData!.length - new Set(errors.map((e) => e.row)).size} users`);
    setCsvData(null);
    setHeaders([]);
    setErrors([]);
  };

  const handleCancel = () => {
    setCsvData(null);
    setHeaders([]);
    setErrors([]);
  };

  return (
    <div>
      <PageHeader title="Bulk Import Users" subtitle="Upload a CSV file to import multiple users at once" />
      <Card>
        {!csvData ? (
          <CsvUploader onParsed={handleParsed} />
        ) : (
          <ImportPreview
            data={csvData}
            headers={headers}
            errors={errors}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </Card>
    </div>
  );
}
