'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().min(8, 'Ingresa un teléfono válido'),
  origin: z.string().min(2, 'Ciudad/País de origen requerido'),
  destination: z.string().min(2, 'Ciudad/País de destino requerido'),
  transportMode: z.string().min(1, 'Selecciona un transporte'),
  weight: z.string().min(1, 'Ingresa el peso/volumen estimado'),
  date: z.string().min(1, 'Selecciona una fecha aproximada'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Datos Personales' },
  { id: 2, title: 'Ruta y Transporte' },
  { id: 3, title: 'Detalles de Carga' },
];

export default function QuoteSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 1) fieldsToValidate = ['name', 'email', 'phone'];
    if (currentStep === 2) fieldsToValidate = ['origin', 'destination', 'transportMode'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Hubo un error al enviar la cotización.');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión al servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants: Variants = {
    hiddenRight: { x: 50, opacity: 0 },
    hiddenLeft: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exitRight: { x: 50, opacity: 0, transition: { duration: 0.3 } },
    exitLeft: { x: -50, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="w-full py-24 bg-slate-50 relative">
      {/* Background Decorator */}
      <div className="absolute top-0 w-full h-[50vh] bg-[#001f3f] z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cotiza tu embarque
          </h2>
          <p className="text-lg text-slate-300">
            Completa nuestro formulario rápido y obtén una tarifa personalizada.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Progress Bar */}
          {!isSuccess && (
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-6">
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0 rounded-full"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary z-0 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
                
                {steps.map((step) => (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                        currentStep >= step.id ? 'bg-brand-primary text-white shadow-md' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                    </div>
                    <span className={`absolute top-12 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                      currentStep >= step.id ? 'text-brand-primary' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Area */}
          <div className="p-8 md:p-12 min-h-[420px] flex flex-col">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">¡Cotización enviada!</h3>
                <p className="text-slate-600 max-w-sm">
                  Hemos recibido tus requerimientos. Uno de nuestros ejecutivos se pondrá en contacto contigo en breve.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-2 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col">
                <div className="flex-grow relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        variants={slideVariants}
                        initial="hiddenRight"
                        animate="visible"
                        exit="exitLeft"
                        className="space-y-6 pt-2 pb-6"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo Empresa / Contacto</label>
                          <input 
                            type="text" 
                            {...register('name')}
                            className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                            placeholder="Ej. Juan Pérez - Empresa S.A."
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                          <input 
                            type="email" 
                            {...register('email')}
                            className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                            placeholder="tu@correo.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
                          <input 
                            type="tel" 
                            {...register('phone')}
                            className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                            placeholder="+56 9 1234 5678"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={slideVariants}
                        initial="hiddenRight"
                        animate="visible"
                        exit="exitLeft"
                        className="space-y-6 pt-2 pb-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Ciudad/País de Origen</label>
                            <input 
                              type="text" 
                              {...register('origin')}
                              className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              placeholder="Ej. Shanghai, China"
                            />
                            {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Ciudad/País de Destino</label>
                            <input 
                              type="text" 
                              {...register('destination')}
                              className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              placeholder="Ej. San Antonio, Chile"
                            />
                            {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Modo de Transporte Preferido</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Marítimo', 'Aéreo', 'Terrestre', 'Aduanero'].map((mode) => (
                              <label key={mode} className="cursor-pointer">
                                <input 
                                  type="radio" 
                                  value={mode} 
                                  {...register('transportMode')}
                                  className="peer sr-only"
                                />
                                <div className="text-center px-4 py-3 rounded-lg border border-slate-200 peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary hover:bg-slate-50 transition-colors font-medium text-sm">
                                  {mode}
                                </div>
                              </label>
                            ))}
                          </div>
                          {errors.transportMode && <p className="text-red-500 text-xs mt-1">{errors.transportMode.message}</p>}
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        variants={slideVariants}
                        initial="hiddenRight"
                        animate="visible"
                        exit="exitLeft"
                        className="space-y-6 pt-2 pb-6"
                      >
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Peso / Volumen Estimado</label>
                            <input 
                              type="text" 
                              {...register('weight')}
                              className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              placeholder="Ej. 2 Cajas, 500kg, 1x20RF"
                            />
                            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Fecha Estimada de Envío</label>
                            <input 
                              type="date" 
                              {...register('date')}
                              className="w-full px-4 py-3 bg-white text-slate-800 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Detalles Adicionales (Opcional)</label>
                          <textarea 
                            {...register('message')}
                            rows={3}
                            className="w-full px-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none"
                            placeholder="Comentarios adicionales sobre la carga, requerimientos especiales, etc."
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting}
                    className={`flex items-center font-medium px-4 py-2 ${currentStep === 1 ? 'text-transparent pointer-events-none' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Atrás
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-6 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-[#00152b] transition-colors shadow-md"
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-[#00152b] focus:ring-4 focus:ring-brand-primary/40 transition-all shadow-md active:scale-95 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Solicitar Cotización'
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
