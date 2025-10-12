'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2,
  Filter,
  Search,
  MapPin,
  Info,
  Home,
  Layers,
  Download,
  RefreshCw
} from 'lucide-react'
import Image from 'next/image'

interface Plot {
  id: string
  plotNumber: string
  sizeMarla: number
  sizeSqm: number
  phase: string
  block: string
  pricePkr: number
  status: string
  coordinates: string
  mapX: number
  mapY: number
  createdAt: string
  updatedAt: string
}

// Plot size categories for filtering (Queen Hills Murree actual sizes)
const plotSizeCategories = [
  { value: 4, label: '4 Marla', color: '#22c55e' },
  { value: 5, label: '5 Marla', color: '#84cc16' },
  { value: 6, label: '6 Marla', color: '#10b981' },
  { value: 7, label: '7 Marla', color: '#06b6d4' },
  { value: 8, label: '8 Marla', color: '#3b82f6' },
  { value: 10, label: '10 Marla', color: '#6366f1' },
  { value: 12, label: '12 Marla', color: '#8b5cf6' },
  { value: 15, label: '15 Marla', color: '#a855f7' },
  { value: 20, label: '1 Kanal (20 Marla)', color: '#ef4444' },
]

// Landmarks on the map
const landmarks = [
  { id: 'main-gate', x: 5, y: 10, icon: '🏛️', label: 'Main Entrance' },
  { id: 'mosque', x: 45, y: 40, icon: '🕌', label: 'Masjid' },
  { id: 'park-1', x: 60, y: 35, icon: '🌳', label: 'Central Park' },
  { id: 'commercial', x: 30, y: 55, icon: '🏪', label: 'Commercial Area' },
  { id: 'club', x: 75, y: 70, icon: '🏌️', label: 'Club House' },
  { id: 'school', x: 20, y: 60, icon: '🏫', label: 'School' },
]

export default function RealPlotMap() {
  const [plots, setPlots] = useState<Plot[]>([])
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null)
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(false)
  const [showLandmarks, setShowLandmarks] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Fetch plots from API
  useEffect(() => {
    fetchPlots()
  }, [])

  const fetchPlots = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('access_token')
      const apiUrl = 'http://localhost:3001/api/v1' // Hardcoded for now
      
      const response = await fetch(`${apiUrl}/plots?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Fetched plots:', data.data?.length || 0) // Debug log
        setPlots(data.data || data.plots || [])
      } else {
        console.error('Failed to fetch plots:', response.status)
      }
    } catch (error) {
      console.error('Error fetching plots:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter plots based on criteria
  const filteredPlots = plots.filter(plot => {
    const matchesSize = selectedSize === null || plot.sizeMarla === selectedSize
    const matchesBlock = selectedBlock === null || plot.block === selectedBlock
    const matchesPhase = selectedPhase === null || plot.phase === selectedPhase
    const matchesStatus = selectedStatus === null || plot.status === selectedStatus
    const matchesSearch = searchQuery === '' || 
      plot.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.block.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSize && matchesBlock && matchesPhase && matchesStatus && matchesSearch
  })

  // Get plot color based on size
  const getPlotColor = (size: number) => {
    const category = plotSizeCategories.find(cat => cat.value === size)
    return category?.color || '#6b7280'
  }

  // Get status color with opacity
  const getStatusStyle = (status: string, size: number) => {
    switch (status.toLowerCase()) {
      case 'available':
        return { fill: '#10b981', opacity: 0.8, strokeWidth: 2 }
      case 'reserved':
        return { fill: '#fbbf24', opacity: 0.8, strokeWidth: 2 }
      case 'sold':
        return { fill: '#ef4444', opacity: 0.7, strokeWidth: 1.5 }
      default:
        return { fill: '#6b7280', opacity: 0.6, strokeWidth: 1.5 }
    }
  }

  // Parse coordinates string to get plot dimensions
  const parseCoordinates = (coordString: string) => {
    const coords = coordString.split(',').map(Number)
    return {
      x: coords[0] || 0,
      y: coords[1] || 0,
      width: coords[2] || 5,
      height: coords[3] || 5
    }
  }

  // Get plot rectangle properties
  const getPlotRect = (plot: Plot) => {
    const coords = parseCoordinates(plot.coordinates)
    return {
      x: plot.mapX || coords.x,
      y: plot.mapY || coords.y,
      width: coords.width,
      height: coords.height
    }
  }

  // Handle zoom
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setZoom(prevZoom => {
      const newZoom = direction === 'in' ? prevZoom * 1.2 : prevZoom / 1.2
      return Math.max(0.5, Math.min(4, newZoom))
    })
  }, [])

  // Handle reset
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setSelectedPlot(null)
    setHoveredPlot(null)
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Mouse handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !e.currentTarget.closest('rect')) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') handleZoom('in')
      if (e.key === '-') handleZoom('out')
      if (e.key === 'r') handleReset()
      if (e.key === 'g') setShowGrid(prev => !prev)
      if (e.key === 'l') setShowLandmarks(prev => !prev)
      if (e.key === 'Escape') setSelectedPlot(null)
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [handleZoom])

  // Calculate statistics
  const stats = {
    total: plots.length,
    available: plots.filter(p => p.status.toLowerCase() === 'available').length,
    reserved: plots.filter(p => p.status.toLowerCase() === 'reserved').length,
    sold: plots.filter(p => p.status.toLowerCase() === 'sold').length,
    blocks: Array.from(new Set(plots.map(p => p.block))).length,
    phases: Array.from(new Set(plots.map(p => p.phase))).length,
  }

  // Get unique values for filters
  const uniqueBlocks = Array.from(new Set(plots.map(p => p.block))).sort()
  const uniquePhases = Array.from(new Set(plots.map(p => p.phase))).sort()
  const uniqueSizes = Array.from(new Set(plots.map(p => p.sizeMarla))).sort((a, b) => a - b)

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-8 flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading plot data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl overflow-hidden">
      {/* Header Controls */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by plot number or block..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Size Filter */}
            <select
              value={selectedSize || ''}
              onChange={(e) => setSelectedSize(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Sizes</option>
              {uniqueSizes.map(size => (
                <option key={size} value={size}>
                  {size === 20 ? '1 Kanal (20 Marla)' : `${size} Marla`}
                </option>
              ))}
            </select>

            {/* Block Filter */}
            <select
              value={selectedBlock || ''}
              onChange={(e) => setSelectedBlock(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Blocks</option>
              {uniqueBlocks.map(block => (
                <option key={block} value={block}>Block {block}</option>
              ))}
            </select>

            {/* Phase Filter */}
            <select
              value={selectedPhase || ''}
              onChange={(e) => setSelectedPhase(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Phases</option>
              {uniquePhases.map(phase => (
                <option key={phase} value={phase}>Phase {phase}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>

            {/* Toggle Buttons */}
            <button
              onClick={() => setShowGrid(prev => !prev)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showGrid ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Toggle Grid (G)"
            >
              <Layers className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowLandmarks(prev => !prev)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showLandmarks ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Toggle Landmarks (L)"
            >
              <MapPin className="h-5 w-5" />
            </button>

            <button
              onClick={fetchPlots}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total:</span>
              <span className="text-gray-600">{stats.total} plots</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Filtered:</span>
              <span className="text-gray-600">{filteredPlots.length} plots</span>
            </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Available: {stats.available}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600">Reserved: {stats.reserved}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Sold: {stats.sold}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Showing: {filteredPlots.length} plots</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-emerald-50 to-blue-50" style={{ height: '75vh' }}>
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => handleZoom('in')}
            className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl"
            title="Zoom In (+)"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl"
            title="Zoom Out (-)"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl"
            title="Reset View (R)"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl"
            title="Fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

        {/* Map View */}
        <div
          ref={mapRef}
          className="relative w-full h-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.3s ease',
            }}
          >
            {/* Background Map Images */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/queen-hills-map.png"
                alt="Queen Hills Murree Master Plan"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Grid Overlay */}
            {showGrid && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.15 }}
              >
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            )}

            {/* Plot Overlays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <filter id="plotShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              {/* Draw plot boundaries */}
              {filteredPlots.map((plot) => {
                const rect = getPlotRect(plot)
                const isSelected = selectedPlot?.id === plot.id
                const isHovered = hoveredPlot?.id === plot.id
                const style = getStatusStyle(plot.status, plot.sizeMarla)

                return (
                  <g key={plot.id}>
                    {/* Plot Rectangle */}
                    <rect
                      x={`${rect.x}%`}
                      y={`${rect.y}%`}
                      width={`${rect.width}%`}
                      height={`${rect.height}%`}
                      fill={style.fill}
                      fillOpacity={isSelected ? 0.9 : isHovered ? 0.8 : style.opacity}
                      stroke={isSelected ? '#fbbf24' : isHovered ? '#3b82f6' : '#374151'}
                      strokeWidth={isSelected ? 3 : isHovered ? 2 : style.strokeWidth}
                      filter={isSelected || isHovered ? "url(#plotShadow)" : "none"}
                      className="cursor-pointer transition-all duration-200 pointer-events-auto"
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                      onClick={() => setSelectedPlot(plot)}
                    />
                    
                    {/* Plot Label */}
                    {(isSelected || isHovered || zoom > 1.5) && (
                      <text
                        x={`${rect.x + rect.width / 2}%`}
                        y={`${rect.y + rect.height / 2}%`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none select-none font-semibold"
                        fill={plot.status.toLowerCase() === 'sold' ? '#ffffff' : '#1f2937'}
                        fontSize={isSelected ? 12 : zoom > 2 ? 11 : 10}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {plot.plotNumber}
                      </text>
                    )}

                    {/* Size Label for larger zoom */}
                    {zoom > 2.2 && (
                      <text
                        x={`${rect.x + rect.width / 2}%`}
                        y={`${rect.y + rect.height / 2 + 1.5}%`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none select-none"
                        fill={plot.status.toLowerCase() === 'sold' ? '#ffffff' : '#6b7280'}
                        fontSize={8}
                      >
                        {plot.sizeMarla === 20 ? '1 Kanal' : `${plot.sizeMarla}M`}
                      </text>
                    )}

                    {/* Status indicator dot */}
                    {zoom > 1.8 && (
                      <circle
                        cx={`${rect.x + rect.width - 1}%`}
                        cy={`${rect.y + 1}%`}
                        r="2"
                        fill={
                          plot.status.toLowerCase() === 'available' ? '#10b981' :
                          plot.status.toLowerCase() === 'reserved' ? '#f59e0b' : '#ef4444'
                        }
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                )
              })}

              {/* Landmarks */}
              {showLandmarks && landmarks.map((landmark) => (
                <g key={landmark.id}>
                  <circle
                    cx={`${landmark.x}%`}
                    cy={`${landmark.y}%`}
                    r="10"
                    fill="#ffffff"
                    stroke="#374151"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                  <text
                    x={`${landmark.x}%`}
                    y={`${landmark.y}%`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    className="pointer-events-none select-none"
                  >
                    {landmark.icon}
                  </text>
                  {zoom > 1.5 && (
                    <text
                      x={`${landmark.x}%`}
                      y={`${landmark.y + 2.5}%`}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#374151"
                      fontWeight="500"
                      className="pointer-events-none select-none"
                    >
                      {landmark.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Plot Information Panel */}
        <AnimatePresence>
          {selectedPlot && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 top-4 bg-white rounded-xl shadow-2xl p-6 max-w-sm z-30"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Plot {selectedPlot.plotNumber}</h3>
                <button
                  onClick={() => setSelectedPlot(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Block:</span>
                  <span className="font-semibold">{selectedPlot.block}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold">
                    {selectedPlot.sizeMarla === 20 ? '1 Kanal' : `${selectedPlot.sizeMarla} Marla`}
                    <span className="text-xs text-gray-500 ml-1">({selectedPlot.sizeSqm.toFixed(1)} sqm)</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phase:</span>
                  <span className="font-semibold">Phase {selectedPlot.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold capitalize px-2 py-1 rounded text-white text-sm ${
                    selectedPlot.status.toLowerCase() === 'available' ? 'bg-green-500' :
                    selectedPlot.status.toLowerCase() === 'reserved' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {selectedPlot.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-lg text-primary-600">
                    PKR {selectedPlot.pricePkr.toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedPlot.status.toLowerCase() === 'available' && (
                <div className="mt-4 space-y-2">
                  <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Book Now
                  </button>
                  <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Schedule Visit
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredPlot && !selectedPlot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bg-black/90 text-white px-4 py-3 rounded-lg text-sm pointer-events-none z-40"
              style={{
                left: '50%',
                bottom: '10%',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="font-semibold text-base">{hoveredPlot.plotNumber}</div>
              <div className="mt-1">
                {hoveredPlot.sizeMarla === 20 ? '1 Kanal' : `${hoveredPlot.sizeMarla} Marla`} • Block {hoveredPlot.block} • Phase {hoveredPlot.phase}
              </div>
              <div className="capitalize mt-1">
                Status: <span className={`font-semibold ${
                  hoveredPlot.status.toLowerCase() === 'available' ? 'text-green-400' :
                  hoveredPlot.status.toLowerCase() === 'reserved' ? 'text-yellow-400' : 'text-red-400'
                }`}>{hoveredPlot.status}</span>
              </div>
              <div className="mt-1 font-semibold">PKR {hoveredPlot.pricePkr.toLocaleString()}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="bg-white border-t p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Sold</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            {plotSizeCategories.slice(0, 6).map(size => (
              <div key={size.value} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: size.color }}></div>
                <span className="text-xs text-gray-600">{size.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <span>Keyboard: + / - (Zoom) • R (Reset) • G (Grid) • L (Landmarks) • ESC (Close)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
