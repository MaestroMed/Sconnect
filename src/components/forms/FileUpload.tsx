"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon, File } from "lucide-react";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

export default function FileUpload({
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx",
  maxSizeMB = 5,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `${file.name} dépasse la taille maximale de ${maxSizeMB}MB`;
    }

    // Check file type
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = acceptedTypes.split(",").map((t) => t.trim().toLowerCase());
    if (!allowedExtensions.includes(extension)) {
      return `${file.name} n'est pas un type de fichier autorisé`;
    }

    return null;
  };

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      setError(null);

      // Check max files
      if (files.length + newFiles.length > maxFiles) {
        setError(`Vous ne pouvez pas ajouter plus de ${maxFiles} fichiers`);
        return;
      }

      const validFiles: File[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        
        // Inline validation
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`${file.name} dépasse la taille maximale de ${maxSizeMB}MB`);
          return;
        }
        const extension = "." + file.name.split(".").pop()?.toLowerCase();
        const allowedExtensions = acceptedTypes.split(",").map((t) => t.trim().toLowerCase());
        if (!allowedExtensions.includes(extension)) {
          setError(`${file.name} n'est pas un type de fichier autorisé`);
          return;
        }
        
        validFiles.push(file);
      }

      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
    [files, maxFiles, maxSizeMB, acceptedTypes, onFilesChange]
  );

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-5 h-5 text-primary-500" />;
    }
    if (file.type === "application/pdf") {
      return <FileText className="w-5 h-5 text-red-500" />;
    }
    return <File className="w-5 h-5 text-dark-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div>
      <label className="input-label mb-2">Pièces jointes (optionnel)</label>
      
      {/* Drop zone — role=button + tabIndex + Enter/Espace : la zone n'était
          cliquable qu'à la souris (input caché, aucun focus possible). */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Ajouter des pièces jointes — ouvre le sélecteur de fichiers"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          isDragging
            ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10"
            : "border-dark-200 dark:border-dark-700 hover:border-primary-300 hover:bg-dark-50 dark:hover:bg-dark-800/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
        <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? "text-primary-500" : "text-dark-400"}`} />
        <p className="text-dark-700 dark:text-dark-200 font-medium mb-1">
          Glissez vos fichiers ici ou cliquez pour parcourir
        </p>
        <p className="text-sm text-dark-500 dark:text-dark-400">
          {maxFiles} fichiers max • {maxSizeMB}MB par fichier • PDF, JPG, PNG, DOC
        </p>
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="error-message mt-2">{error}</p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-dark-50 dark:bg-dark-800/60 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file)}
                <div>
                  <p className="text-sm font-medium text-dark-900 dark:text-white truncate max-w-[200px] md:max-w-none">
                    {file.name}
                  </p>
                  <p className="text-xs text-dark-500 dark:text-dark-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-dark-200 dark:hover:bg-dark-700 rounded-lg transition-colors"
                aria-label={`Supprimer ${file.name}`}
              >
                <X className="w-4 h-4 text-dark-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

