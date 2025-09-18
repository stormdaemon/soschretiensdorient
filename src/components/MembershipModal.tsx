import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  motivation: string;
  acceptTerms: boolean;
  acceptNewsletter: boolean;
}

const COOLDOWN_KEY = 'sos_membership_cooldown';
const COOLDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success' | 'cooldown'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    motivation: '',
    acceptTerms: false,
    acceptNewsletter: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Check cooldown on mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      checkCooldown();
    }
  }, [isOpen]);

  // Update countdown timer
  useEffect(() => {
    if (cooldownEndTime && step === 'cooldown') {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = cooldownEndTime - now;
        
        if (remaining <= 0) {
          setCooldownEndTime(null);
          setStep('form');
          localStorage.removeItem(COOLDOWN_KEY);
        } else {
          setTimeRemaining(formatTimeRemaining(remaining));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cooldownEndTime, step]);

  const checkCooldown = () => {
    const cooldownData = localStorage.getItem(COOLDOWN_KEY);
    if (cooldownData) {
      const endTime = parseInt(cooldownData, 10);
      const now = Date.now();
      
      if (now < endTime) {
        setCooldownEndTime(endTime);
        setStep('cooldown');
        setTimeRemaining(formatTimeRemaining(endTime - now));
      } else {
        localStorage.removeItem(COOLDOWN_KEY);
      }
    }
  };

  const formatTimeRemaining = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'La motivation est requise';
    } else if (formData.motivation.length < 50) {
      newErrors.motivation = 'Veuillez détailler votre motivation (minimum 50 caractères)';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set cooldown
      const cooldownEnd = Date.now() + COOLDOWN_DURATION;
      localStorage.setItem(COOLDOWN_KEY, cooldownEnd.toString());
      
      setStep('success');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        motivation: '',
        acceptTerms: false,
        acceptNewsletter: false,
      });
      setErrors({});
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('form');
    }
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl z-50">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Devenez membre actif</h2>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      Remplissez ces informations pour être recontacté par notre équipe adhésions et
                      choisir la formule la plus adaptée à votre engagement.
                    </p>
                  </div>
                  <Dialog.Close asChild>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fermer le formulaire">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire d'adhésion SOS Chrétiens d'Occident">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && (
                        <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Votre nom"
                      />
                      {errors.lastName && (
                        <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="prenom.nom@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone (avec indicatif) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ex. +33 6 12 34 56 78"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivation *
                    </label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none ${
                        errors.motivation ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Expliquez-nous pourquoi vous souhaitez nous rejoindre et comment vous pouvez contribuer à notre mission..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.motivation && (
                        <p className="text-red-600 text-sm">{errors.motivation}</p>
                      )}
                      <p className="text-gray-500 text-sm ml-auto">
                        {formData.motivation.length}/500
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte les{' '}
                        <a href="/conditions-utilisation" className="text-red-600 hover:underline">
                          conditions d'utilisation
                        </a>{' '}
                        et la{' '}
                        <a href="/politique-confidentialite" className="text-red-600 hover:underline">
                          politique de confidentialité
                        </a>{' '}
                        *
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-red-600 text-sm">{errors.acceptTerms}</p>
                    )}

                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptNewsletter}
                        onChange={(e) => handleInputChange('acceptNewsletter', e.target.checked)}
                        className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">
                        Je souhaite recevoir la newsletter et les informations importantes
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </div>
                    ) : (
                      'Envoyer ma candidature'
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 text-center"
              >
                <div className="flex items-center justify-between mb-6">
                  <div />
                  <Dialog.Close asChild>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Votre candidature est bien reçue
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Merci pour votre engagement. Un membre de l’équipe adhésions reviendra vers vous sous 48 heures
                  pour finaliser votre inscription et répondre à vos questions.
                </p>

                <p className="text-sm text-gray-500 mb-8">
                  Vous recevrez un courriel de confirmation à l’adresse indiquée.
                </p>

                <button
                  onClick={handleClose}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                >
                  Fermer
                </button>
              </motion.div>
            )}

            {step === 'cooldown' && (
              <motion.div
                key="cooldown"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 text-center"
              >
                <div className="flex items-center justify-between mb-6">
                  <div />
                  <Dialog.Close asChild>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Vous avez déjà une demande en cours
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nous traitons actuellement votre précédente demande. 
                  Vous pourrez soumettre un nouveau formulaire dans :
                </p>

                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {timeRemaining}
                  </div>
                  <div className="text-sm text-gray-500">
                    heures : minutes : secondes
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-8">
                  Besoin d’un échange prioritaire ? Contactez-nous à catholicloungemusic@gmail.com.
                </p>

                <button
                  onClick={handleClose}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                >
                  Fermer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MembershipModal;
