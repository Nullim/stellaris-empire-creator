import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

export default function TraitDescription({ trait }) {
  const { traitName, traitDescription, traitEffects } = trait
  const formattedEffects = traitEffects.map((effect, index) => {
    const formattedEffect = effect
      .replace(/\$G\$/g, '<span class="text-green-500">').replace(/&G&/g, '</span>')
      .replace(/\$C\$/g, '<span class="text-cyan-500">').replace(/&C&/g, '</span>')
      .replace(/\$R\$/g, '<span class="text-red-500">').replace(/&R&/g, '</span>')
      .replace(/\$Y\$/g, '<span class="text-yellow-400">').replace(/&Y&/g, '</span>')
      .replace(/\$O\$/g, '<span class="text-orange-500">').replace(/&O&/g, '</span>');
    const sanitizedEffect = DOMPurify.sanitize(formattedEffect)
    return (
      <div key={index} className='font-normal text-base' dangerouslySetInnerHTML={{ __html: sanitizedEffect }} />
    );
  });
  return (
    <div className='flex flex-col text-left'>
      <p className='font-bold text-xl'>{traitName}</p>
      <p className='font-normal italic text-base text-stone-400 pb-2'>{traitDescription}</p>
      {formattedEffects}
    </div>
  )
}

TraitDescription.propTypes = {
  trait: PropTypes.shape({
    traitName: PropTypes.string.isRequired,
    traitDescription: PropTypes.string.isRequired,
    traitEffects: PropTypes.arrayOf(PropTypes.string).isRequired,
  })
}
