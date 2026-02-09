import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import type { CsvRow } from '../../types';

const { Dragger } = Upload;

interface CsvUploaderProps {
  onParsed: (data: CsvRow[], headers: string[]) => void;
}

export default function CsvUploader({ onParsed }: CsvUploaderProps) {
  return (
    <Dragger
      accept=".csv"
      maxCount={1}
      showUploadList={false}
      beforeUpload={(file) => {
        Papa.parse<CsvRow>(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data.length === 0) {
              message.error('CSV file is empty');
              return;
            }
            const headers = results.meta.fields || [];
            onParsed(results.data, headers);
            message.success(`Parsed ${results.data.length} rows`);
          },
          error: () => {
            message.error('Failed to parse CSV file');
          },
        });
        return false;
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag a CSV file to upload</p>
      <p className="ant-upload-hint">Supports single CSV file with headers: name, email, role</p>
    </Dragger>
  );
}
