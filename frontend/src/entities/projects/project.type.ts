export interface Project {
  id: number;
  name: string;
  dataType: string[];
  qualityScore: number;
  validationStatus: string;
  lastUpdate: string;
  status: string;
  DNA_qualityScore?: number;
  RNA_qualityScore?: number;
  Methyl_qualityScore?: number;
  Protein_qualityScore?: number;
  sample_accuracy?: number;
}
