/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Thermometer, Clock, MapPin, Star, Award, Heart } from 'lucide-react';
import { TeaProduct, Language } from '../types';

interface ProductDetailModalProps {
  product: TeaProduct;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: TeaProduct) => void;
}

export default function ProductDetailModal({ product, lang, onClose, onAddToCart }: ProductDetailModalProps) {
  return (
    <div>
      <h1>Product Detail Modal</h1>
    </div>
  );
}