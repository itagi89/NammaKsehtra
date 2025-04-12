export interface CardItem {
    id: number;
    title: string;
    content: string[];
  }
  
  export interface ProjectDetail {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  }
  
  export interface PersonInfo {
    name: string;
    location: string;
    imageUrl: string;
  }
  export interface ZillaPanchayatInfo {
    id: number;
    name: string;
    description: string;
    createdAt: string;
  }