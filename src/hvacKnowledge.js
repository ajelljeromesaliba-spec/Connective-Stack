export const companyProfile = {
  name: 'Northstar Heating & Air',
  serviceArea: 'Dallas, Fort Worth, Arlington, Plano, Frisco, McKinney, Irving, Garland, Richardson, Carrollton, Grapevine, Keller, Southlake, Grand Prairie, and Lewisville',
  hours: 'Monday through Friday, 8:00 AM to 6:00 PM Central Time, and Saturday, 8:00 AM to 2:00 PM. Routine service is closed on Sunday',
}

export const defaultQuickReplies = [
  'My AC is not cooling',
  'Book service',
  'What do you charge?',
  'Do you service my area?',
  'Maintenance plans',
]

const knowledgeBase = [
  {
    id: 'no-cooling',
    keywords: ['not cooling', 'no cooling', 'ac broken', 'ac not working', 'warm air', 'hot air', 'house hot', 'air conditioner broken', 'air conditioning broken'],
    answer: 'I can help arrange service. Before booking, check that the thermostat is set to COOL, the temperature is below the current room temperature, the air filter is not heavily clogged, and the indoor and outdoor breakers have not tripped. Do not repeatedly reset a breaker. If you notice smoke, burning odors, sparking, or a CO alarm, leave the area and contact emergency services. Would you like to book an AC diagnostic?',
    replies: ['Book AC diagnostic', 'What is the diagnostic fee?', 'My system is leaking water'],
  },
  {
    id: 'no-heat',
    keywords: ['no heat', 'not heating', 'furnace broken', 'heater broken', 'cold air', 'house cold', 'heat not working'],
    answer: 'Please confirm the thermostat is set to HEAT, replace weak thermostat batteries if applicable, check the filter, and verify the furnace switch and breaker are on. Do not open or service gas components yourself. If you smell gas, hear a CO alarm, or feel dizzy or nauseated, go outside immediately and call 911 or the gas utility. Would you like to request heating service?',
    replies: ['Book heating service', 'Furnace repair or replacement?', 'Maintenance plans'],
  },
  {
    id: 'water-leak',
    keywords: ['leaking water', 'water leak', 'dripping', 'drain line', 'condensate', 'water around unit', 'ceiling leak'],
    answer: 'Water near an indoor HVAC unit can come from a clogged condensate drain, frozen coil, damaged drain pan, or another source. Turn the system off if water is near electrical components and avoid standing water. A technician should inspect it promptly to prevent property damage. I can help schedule a diagnostic.',
    replies: ['Book diagnostic', 'Is this an emergency?', 'What do you charge?'],
  },
  {
    id: 'strange-noise',
    keywords: ['noise', 'rattling', 'buzzing', 'grinding', 'squealing', 'banging', 'clicking'],
    answer: 'Unusual sounds may point to loose panels, airflow restriction, motor or bearing wear, electrical components, or debris. Turn the system off if the noise is loud, metallic, paired with a burning smell, or getting worse. A diagnostic is the safest next step.',
    replies: ['Book diagnostic', 'My AC is not cooling', 'What is covered?'],
  },
  {
    id: 'short-cycling',
    keywords: ['short cycling', 'turns on and off', 'keeps starting', 'cycles often', 'runs constantly', 'never shuts off'],
    answer: 'Frequent cycling or nonstop operation can be caused by thermostat issues, restricted airflow, dirty coils, incorrect system sizing, refrigerant problems, or extreme outdoor conditions. Check the filter and thermostat first. If the behavior continues, schedule a diagnostic to avoid unnecessary wear.',
    replies: ['Book diagnostic', 'Do I need replacement?', 'Maintenance plans'],
  },
  {
    id: 'services',
    keywords: ['services', 'what do you do', 'hvac service', 'repair service', 'install', 'installation'],
    answer: 'This demo company handles AC and furnace repair, heat pumps, system replacement, seasonal maintenance, thermostats, ductwork and airflow, indoor air quality, mini-splits, and light commercial HVAC. Refrigerant work is performed only by properly certified technicians.',
    replies: ['Book service', 'System replacement', 'Indoor air quality'],
  },
  {
    id: 'assistant-capabilities',
    keywords: ['what can the assistant answer', 'what can you answer', 'what can you do', 'knowledge base', 'topics covered'],
    answer: 'I can answer questions about cooling, heating, heat pumps, thermostats, filters, airflow, ductwork, indoor air quality, maintenance, repairs, replacement, brands, warranties, financing, prices, hours, service areas, arrival preparation, and commercial requests. I can also recognize urgent safety language and collect a structured service request.',
    replies: ['My AC is not cooling', 'What do you charge?', 'Book service'],
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'charge', 'diagnostic fee', 'service fee', 'estimate', 'how much'],
    answer: 'This portfolio demo does not provide binding prices or invent a diagnostic fee. Actual pricing depends on the equipment, the cause of the problem, access, parts, permits, and the work required. In a live implementation, the assistant would share only the contractor’s approved pricing or collect details for an estimate.',
    replies: ['Book service', 'Financing options', 'Repair or replace?'],
  },
  {
    id: 'emergency',
    keywords: ['emergency', 'after hours', '24/7', 'tonight', 'weekend', 'urgent', 'same day'],
    answer: 'The demo can identify urgent situations and collect an after-hours request for priority review, but it cannot dispatch emergency service or promise a response time. Life-safety hazards must go to 911, the fire department, or the gas utility first.',
    replies: ['Request emergency service', 'What is the after-hours fee?', 'Book regular service'],
  },
  {
    id: 'service-area',
    keywords: ['service area', 'location', 'where', 'zip', 'area', 'travel', 'come to', 'city', 'cities', 'dallas', 'fort worth'],
    answer: `The fictional service area includes ${companyProfile.serviceArea}. Locations outside those cities are collected for service-area verification rather than automatically rejected.`,
    replies: ['Book service', 'Business hours', 'What information do you need?'],
  },
  {
    id: 'hours',
    keywords: ['hours', 'open', 'closing', 'business hours', 'available'],
    answer: `Sample office hours are ${companyProfile.hours}. Same-day, after-hours, and appointment-window availability always requires confirmation.`,
    replies: ['Book service', 'Emergency service', 'Service area'],
  },
  {
    id: 'maintenance',
    keywords: ['maintenance', 'tune up', 'tune-up', 'membership', 'plan', 'seasonal', 'preventive'],
    answer: 'The demo can collect a one-time tune-up, preventive maintenance, filter-guidance, or maintenance-plan inquiry. Exact plan benefits, discounts, and priority-service terms must come from the contractor’s approved policy and are not invented in this demonstration.',
    replies: ['Join maintenance plan', 'What is checked?', 'Book a tune-up'],
  },
  {
    id: 'maintenance-checklist',
    keywords: ['what is checked', 'checklist', 'tune up include', 'maintenance include'],
    answer: 'A professional visit can include thermostat checks, electrical connections, voltage and current, condensate drainage, system controls, coils, airflow and blower components, refrigerant performance, burners, combustion, and heat exchanger condition when applicable. The exact checklist depends on the equipment.',
    replies: ['Book a tune-up', 'How often?', 'Maintenance plans'],
  },
  {
    id: 'filter',
    keywords: ['filter', 'air filter', 'change filter', 'filter size', 'dirty filter'],
    answer: 'Inspect the filter monthly and replace or clean it according to the manufacturer, home conditions, pets, allergies, and filter type. A heavily loaded filter can restrict airflow, increase operating cost, and contribute to equipment problems. The correct size is printed on the existing filter frame or listed in the equipment documentation.',
    replies: ['Maintenance plans', 'Indoor air quality', 'My system runs constantly'],
  },
  {
    id: 'replace',
    keywords: ['replace', 'replacement', 'new system', 'new ac', 'new furnace', 'repair or replace', 'system age', 'old system'],
    answer: 'Replacement may be worth comparing when equipment is older, needs frequent repairs, has a major failed component, uses an obsolete refrigerant, creates uneven comfort, or has rising energy use. A technician should compare repair cost, system condition, efficiency, comfort goals, and expected remaining life before recommending replacement.',
    replies: ['Request replacement estimate', 'Financing options', 'Heat pump options'],
  },
  {
    id: 'financing',
    keywords: ['finance', 'financing', 'monthly payment', 'payment plan', 'credit'],
    answer: 'Financing is shown as available on approved credit for qualifying replacements and larger repairs. A real client implementation would link to the contractor’s lender application and display the required disclosures. The assistant never guarantees approval.',
    replies: ['Request replacement estimate', 'Payment methods', 'Book service'],
  },
  {
    id: 'warranty',
    keywords: ['warranty', 'guarantee', 'covered', 'coverage', 'labor warranty', 'parts warranty'],
    answer: 'Equipment, parts, and labor warranty coverage varies by manufacturer, contractor, registration status, installation date, and service history. The demo can collect the model and installation details for review but cannot confirm coverage or promise a free repair.',
    replies: ['Check warranty information', 'Book service', 'Maintenance plans'],
  },
  {
    id: 'brands',
    keywords: ['brand', 'brands', 'carrier', 'trane', 'lennox', 'rheem', 'goodman', 'daikin', 'american standard', 'york'],
    answer: 'The demo company services most major residential brands and common system types. Parts availability and warranty processing vary. Share the brand, model, and serial number during booking if you have them, but service can still be requested without that information.',
    replies: ['Book service', 'Where is my model number?', 'Warranty information'],
  },
  {
    id: 'heat-pump',
    keywords: ['heat pump', 'dual fuel', 'electric heat', 'heat pump options'],
    answer: 'Heat pumps provide both heating and cooling. The right fit depends on climate, electrical service, home load, ductwork, comfort goals, utility rates, and available incentives. A proper replacement estimate should include load considerations and equipment matching rather than using square footage alone.',
    replies: ['Request replacement estimate', 'Financing options', 'Ductwork'],
  },
  {
    id: 'thermostat',
    keywords: ['thermostat', 'smart thermostat', 'nest', 'ecobee', 'temperature wrong', 'blank thermostat'],
    answer: 'Thermostat services include setup, replacement, compatibility checks, scheduling, Wi-Fi connection, and troubleshooting. A blank display may be caused by batteries, power loss, a safety switch, wiring, or equipment issues. Do not handle exposed wiring unless qualified.',
    replies: ['Book thermostat service', 'My system is not working', 'Smart thermostat options'],
  },
  {
    id: 'ducts',
    keywords: ['duct', 'ductwork', 'airflow', 'weak airflow', 'hot room', 'cold room', 'uneven temperature', 'room warmer'],
    answer: 'Uneven rooms and weak airflow may involve filters, dampers, registers, duct leakage or restriction, blower performance, insulation, solar gain, or system sizing. A comfort assessment can measure airflow and inspect accessible ductwork before recommending sealing, balancing, or equipment changes.',
    replies: ['Book comfort assessment', 'Duct cleaning', 'Maintenance plans'],
  },
  {
    id: 'iaq',
    keywords: ['indoor air quality', 'air quality', 'allergy', 'allergies', 'dust', 'humidity', 'mold', 'air purifier', 'uv light', 'dehumidifier'],
    answer: 'Indoor air quality options can include filtration, humidity control, fresh-air ventilation, duct evaluation, and air-cleaning equipment. The right solution depends on the source of the concern. HVAC equipment is not a substitute for professional mold remediation or medical advice.',
    replies: ['Book air quality assessment', 'Filter recommendations', 'Humidity problems'],
  },
  {
    id: 'duct-cleaning',
    keywords: ['duct cleaning', 'clean ducts'],
    answer: 'Duct cleaning is not automatically recommended for every home. First identify the concern, such as visible debris, confirmed contamination, pest activity, construction dust, or airflow problems. The demo workflow routes this request for an inspection before quoting unnecessary work.',
    replies: ['Book duct inspection', 'Indoor air quality', 'Weak airflow'],
  },
  {
    id: 'commercial',
    keywords: ['commercial', 'business', 'office', 'restaurant', 'property manager', 'landlord', 'tenant'],
    answer: 'Light commercial service is available for offices, retail spaces, and small facilities. The intake collects site access, equipment count, tenant or manager contact, operating hours, and approval requirements. Renters should confirm the property owner or manager authorizes service before work begins.',
    replies: ['Request commercial service', 'Book service', 'Service area'],
  },
  {
    id: 'payment',
    keywords: ['payment', 'credit card', 'cash', 'check', 'pay'],
    answer: 'Payment methods and payment timing are not defined for this fictional demonstration. A real implementation would answer only from the contractor’s approved payment policy and could route customers to a secure payment process.',
    replies: ['Book service', 'Financing options', 'What do you charge?'],
  },
  {
    id: 'arrival',
    keywords: ['prepare', 'before technician', 'arrival', 'appointment window', 'technician coming'],
    answer: 'Before the technician arrives, secure pets, clear access to indoor and outdoor equipment, locate the thermostat, and share parking or gate instructions. If possible, have the model, serial number, recent service history, and a description of when the problem started.',
    replies: ['Book service', 'What information do you need?', 'Reschedule appointment'],
  },
  {
    id: 'credentials',
    keywords: ['licensed', 'insured', 'certified', 'license', 'epa certified', 'background checked'],
    answer: 'This fictional profile is configured to show licensed and insured service with background-checked technicians and EPA Section 608 certification for refrigerant work. A real client build would display only verified company credentials and license numbers.',
    replies: ['Book service', 'Warranty information', 'About the demo'],
  },
  {
    id: 'demo',
    keywords: ['demo', 'about this', 'is this real', 'real company', 'how does this work'],
    answer: 'This is a portfolio demonstration created by Connective Stack. Northstar Heating & Air, its phone number, prices, appointments, and lead records are fictional. The assistant demonstrates how a real HVAC knowledge base, qualification flow, booking handoff, and CRM routing can work.',
    replies: ['Book a demo appointment', 'What can the assistant answer?', 'Contact Connective Stack'],
  },
]

const normalize = value => value.toLowerCase().replace(/[^a-z0-9\s$-]/g, ' ').replace(/\s+/g, ' ').trim()

export function findKnowledgeAnswer(input) {
  const query = normalize(input)

  const lifeSafetyTerms = ['carbon monoxide', 'co alarm', 'gas smell', 'smell gas', 'rotten egg', 'dizzy', 'nausea', 'faint', 'can t breathe', 'cannot breathe']
  if (lifeSafetyTerms.some(term => query.includes(term))) {
    return {
      id: 'life-safety',
      urgent: true,
      answer: 'Leave the building and move to fresh air immediately. Call 911, the fire department, or your gas utility from outside. Do not search for the source, operate switches, or reenter until emergency responders say it is safe. This chat cannot diagnose a life safety hazard.',
      replies: ['I am outside and safe', 'Start a separate service request'],
    }
  }

  const fireTerms = ['fire', 'smoke', 'sparking', 'electrical burning', 'burning smell', 'flames']
  if (fireTerms.some(term => query.includes(term))) {
    return {
      id: 'fire-safety',
      urgent: true,
      answer: 'If there is fire, smoke, sparking, or an active electrical hazard, leave the area and call 911. If there is no immediate danger and you can do so safely, stop using the HVAC system. Do not remove panels or touch damaged wiring.',
      replies: ['I am safe', 'Request service after the emergency'],
    }
  }

  const matches = knowledgeBase.map(item => {
    const score = item.keywords.reduce((total, keyword) => {
      if (query.includes(keyword)) return total + keyword.split(' ').length + 2
      return total
    }, 0)
    return { item, score }
  }).filter(match => match.score > 0).sort((a, b) => b.score - a.score)

  if (matches.length) {
    const selected = matches.slice(0, 2).map(match => match.item)
    return {
      id: selected.map(item => item.id).join('+'),
      answer: selected.map(item => item.answer).join('\n\n'),
      replies: [...new Set(selected.flatMap(item => item.replies))].slice(0, 4),
      urgent: selected.some(item => item.urgent),
    }
  }

  return {
    id: 'fallback',
    answer: 'I do not want to guess about your HVAC system. I can help with repairs, maintenance, replacement estimates, heat pumps, thermostats, ductwork, indoor air quality, pricing, service areas, warranties, financing, or booking. For equipment-specific advice, a technician should inspect the system.',
    replies: ['View services', 'Book service', 'Speak with the office'],
  }
}
