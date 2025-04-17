import { TourPricingForm } from '../TourPricingForm';
import { render, screen, fireEvent } from '@testing-library/react';    
    
    it('should update pricePerPerson when TourCostPerPerson onChange is triggered', () => {
        // Arrange
        const setFormData = jest.fn();
        const formData = { pricePerPerson: '100' };
        const { getByLabelText } = render(<TourPricingForm formData={formData} setFormData={setFormData} />);
    
        // Act
        const priceInput = getByLabelText(/Price per Person/i);
        fireEvent.change(priceInput, { target: { value: '200' } });
    
        // Assert
        expect(setFormData).toHaveBeenCalledWith({ pricePerPerson: '200' });
      });