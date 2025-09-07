import React, { useState, useEffect, useCallback, useMemo } from 'react'
import api from '../config/api'
import { useAuth } from '../contexts/AuthContext'
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  RefreshCw, 
  LogOut,
  X,
  ZoomIn
} from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [resolvingIds, setResolvingIds] = useState(new Set())
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchIssues = useCallback(async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) setRefreshing(true)
      console.log('Fetching issues from API...')
      const response = await api.get('/api/issues')
      console.log('API Response:', response.data)
      console.log('First issue data:', response.data[0])
      console.log('Image fields check:', response.data.map(issue => ({ 
        id: issue._id, 
        photoUrl: issue.photoUrl, 
        image: issue.image,
        hasPhotoUrl: !!issue.photoUrl,
        hasImage: !!issue.image
      })))
      setIssues(response.data)
    } catch (error) {
      console.error('Error fetching issues:', error)
      console.error('Error details:', error.response?.data || error.message)
      
      // Show error message to user
      alert(`Failed to fetch issues: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
      if (showRefreshLoader) setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchIssues()
  }, [fetchIssues])

  // Memoized stats calculation to prevent unnecessary recalculations
  const stats = useMemo(() => {
    const total = issues.length
    const resolved = issues.filter(issue => issue.issue_resolved).length
    const pending = total - resolved
    
    return { total, pending, resolved }
  }, [issues])

  const handleResolveIssue = async (issueId) => {
    try {
      setResolvingIds(prev => new Set([...prev, issueId]))
      await api.patch(`/api/issues/${issueId}/resolve`)
      
      // Optimistically update the UI
      setIssues(prevIssues => 
        prevIssues.map(issue => 
          issue._id === issueId 
            ? { ...issue, issue_resolved: true, updatedAt: new Date().toISOString() }
            : issue
        )
      )
    } catch (error) {
      console.error('Failed to resolve issue:', error)
      alert('Failed to resolve issue. Please try again.')
    } finally {
      setResolvingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(issueId)
        return newSet
      })
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Memoized filtered arrays to prevent unnecessary recalculations
  const pendingIssues = useMemo(() => 
    issues.filter(issue => !issue.issue_resolved), [issues]
  )
  
  const resolvedIssues = useMemo(() => 
    issues.filter(issue => issue.issue_resolved), [issues]
  )

  const openImageModal = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title })
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Jharkhand_Rajakiya_Chihna.svg" 
                alt="Government of Jharkhand" 
                className="w-10 h-10"
              />
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Jharkhand Municipal Portal</h1>
                <p className="text-sm text-gray-600">Administrator Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fetchIssues(true)}
                disabled={refreshing}
                className="btn btn-secondary"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="btn btn-secondary"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Issues</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending Issues</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resolved Issues</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.resolved}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading issues...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pending Issues */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  Pending Issues ({pendingIssues.length})
                </h2>
              </div>

              {pendingIssues.length > 0 ? (
                <div className="space-y-3">
                  {pendingIssues.map((issue) => (
                    <div key={issue._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Issue Image */}
                        {(issue.photoUrl || issue.image) && (
                          <div className="flex-shrink-0">
                            <div className="relative group cursor-pointer" onClick={() => openImageModal(issue.photoUrl || issue.image, issue.title)}>
                              <img 
                                src={issue.photoUrl || issue.image} 
                                alt={issue.title}
                                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-100 group-hover:border-orange-300 transition-colors duration-200"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                                <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                                {issue.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Pending
                                </span>
                                {issue.priority && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                                    issue.priority === 'High' ? 'bg-red-100 text-red-700' :
                                    issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {issue.priority}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                            {issue.description}
                          </p>
                          
                          <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
                            <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(issue.createdAt)}
                            </span>
                            {issue.location && (
                              <span className="flex items-center bg-blue-50 px-2 py-1 rounded-md text-blue-600">
                                <span className="w-3 h-3 mr-1">📍</span>
                                {issue.location}
                              </span>
                            )}
                            {issue.category && (
                              <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 font-medium">
                                {issue.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-2 border-t border-gray-50">
                        <button
                          onClick={() => handleResolveIssue(issue._id)}
                          disabled={resolvingIds.has(issue._id)}
                          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-sm"
                        >
                          {resolvingIds.has(issue._id) ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Resolving...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Resolved
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Issues</h3>
                  <p className="text-gray-600">All reported issues have been resolved. Great work!</p>
                </div>
              )}
            </section>

            {/* Resolved Issues */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Resolved Issues ({resolvedIssues.length})
                </h2>
              </div>

              {resolvedIssues.length > 0 ? (
                <div className="space-y-3">
                  {resolvedIssues.map((issue) => (
                    <div key={issue._id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-lg hover:border-green-200 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Issue Image */}
                        {(issue.photoUrl || issue.image) && (
                          <div className="flex-shrink-0">
                            <div className="relative group cursor-pointer" onClick={() => openImageModal(issue.photoUrl || issue.image, issue.title)}>
                              <img 
                                src={issue.photoUrl || issue.image} 
                                alt={issue.title}
                                className="w-16 h-16 object-cover rounded-lg border-2 border-green-100 group-hover:border-green-300 transition-colors duration-200"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                                <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                                {issue.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Resolved
                                </span>
                                {issue.priority && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                                    issue.priority === 'High' ? 'bg-red-100 text-red-700' :
                                    issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {issue.priority}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                            {issue.description}
                          </p>
                          
                          <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
                            <span className="flex items-center bg-white bg-opacity-60 px-2 py-1 rounded-md">
                              <Clock className="w-3 h-3 mr-1" />
                              Reported: {formatDate(issue.createdAt)}
                            </span>
                            <span className="flex items-center bg-green-100 px-2 py-1 rounded-md text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Resolved: {formatDate(issue.updatedAt)}
                            </span>
                            {issue.location && (
                              <span className="flex items-center bg-blue-50 px-2 py-1 rounded-md text-blue-600">
                                <span className="w-3 h-3 mr-1">📍</span>
                                {issue.location}
                              </span>
                            )}
                            {issue.category && (
                              <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 font-medium">
                                {issue.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resolved Issues</h3>
                  <p className="text-gray-600">Resolved issues will appear here once you start marking them as complete.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
              <p className="text-white text-lg font-semibold">{selectedImage.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
