export interface ScrollToTopButtonProps {
	show: boolean;
	onClick: () => void;
}

export interface SearchAndFilterProps {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	statusFilter: string[];
	setStatusFilter: (value: string[]) => void;
	boardFilter: string[];
	setBoardFilter: (value: string[]) => void;
	boards: string[];
}

export interface FilterPanelProps {
	statusFilter: string[];
	setStatusFilter: (value: string[]) => void;
	boardFilter: string[];
	setBoardFilter: (value: string[]) => void;
	boards: string[];
}